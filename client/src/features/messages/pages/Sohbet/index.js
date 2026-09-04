import React, { useContext, useEffect, useState } from 'react';
import { PortfolioContext } from "../../../Context/workContext";
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BASE_URL);

const MessagingUI = () => {
  const {
    Message,
    messages,
    setMessages, 
    formatToTurkishDate,
    usersListPerson,
    userList,
    getMessage,
  } = useContext(PortfolioContext);

  const [aliciId, setAliciId] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("login"));
  const gonderenId = currentUser?.result?._id;
  const [newMessage, setNewMessage] = useState('');

  const findUserPhotoById = (id) => {
    const user = userList.find((u) => u._id === id);
    return user?.file || "https://via.placeholder.com/40";
  };

  useEffect(() => {
    if (gonderenId && aliciId) {
      Message(gonderenId, aliciId);
    }
    usersListPerson(gonderenId);
    getMessage(gonderenId);
  }, [aliciId]);


  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      if (
        (msg.gonderenId === gonderenId && msg.aliciId === aliciId) ||
        (msg.gonderenId === aliciId && msg.aliciId === gonderenId)
      ) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => socket.off('receiveMessage');
  }, [gonderenId, aliciId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const msgData = {
      gonderenId,
      aliciId,
      text: newMessage,
    };

    socket.emit('sendMessage', msgData);
    setNewMessage('');
  };

  const filtred = userList.filter((user) =>
    messages.some(
      (msg) =>
        (msg.gonderenId === currentUser?.result?._id && msg.aliciId === user._id) ||
        (msg.aliciId === currentUser?.result?._id && msg.gonderenId === user._id)
    )
  );
  

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
 
      <div className="w-1/3 border-r bg-white p-4">
        <h2 className="text-xl font-semibold mb-4">Gelen Kutusu</h2>
        <ul className="space-y-2 overflow-y-auto h-[calc(100vh-150px)]">
     
           {filtred && filtred.map((user) => (
            <li
              key={user._id}
              onClick={() => setAliciId(user._id)}
              className={`p-3 rounded cursor-pointer ${aliciId === user._id ? "bg-purple-100" : "hover:bg-gray-100"}`}
            >
              <div className="flex items-center gap-2">
                <img src={user?.file} alt="resim" width="50" height="50" className="rounded-full" />
                <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
              </div>
            </li>
          ))} 
         
        </ul>
      </div>


      <div className="flex-1 flex flex-col p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Mesajlar</h3>

        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 italic">Henüz mesaj yok</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.gonderenId === gonderenId ? 'justify-end' : 'justify-start'} mb-2`}
              >
                <div className="max-w-md flex items-center gap-2">
                  {msg.gonderenId !== gonderenId && (
                    <img
                      src={findUserPhotoById(msg.gonderenId)}
                      width="40"
                      height="40"
                      className="rounded-full "
                      alt="profil"
                    />
                  )}

                  <div
                    className={`px-4 py-2 rounded-lg ${
                      msg.gonderenId === gonderenId
                        ? 'bg-purple-600 text-white rounded-tr-none'
                        : 'bg-gray-300 text-gray-900 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-60">{formatToTurkishDate(msg.time)}</p>
                  </div>

           
                </div>
              </div>
            ))
          )}
        </div>


        <form
          onSubmit={handleSend}
          className="p-3 border-t bg-white flex items-center space-x-2"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Mesajınızı yazın..."
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessagingUI;
