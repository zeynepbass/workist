import React, { useEffect, useState,useContext } from 'react';
import io from 'socket.io-client';
import { PortfolioContext } from '../../../Context/workContext';


const socket = io('http://localhost:1998');

const MessagingUI = ({ adi, open, gonderenId, aliciId, onClose }) => {
const {messages,setMessages,Message}=useContext(PortfolioContext)
  const [newMessage, setNewMessage] = useState('');


  useEffect(() => {
    if (!open || !gonderenId || !aliciId) return;
    Message(gonderenId,aliciId)


  }, [open, gonderenId, aliciId]);

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

  return (
    <>
      {open && (
        <div className="z-50 fixed bottom-5 right-10 h-[30vh] w-[400px] bg-gray-100 font-sans shadow-lg rounded-t-xl flex flex-col">
   
          <div className="p-4 border-b bg-white flex justify-between items-center">
            <div>
              <p className="font-bold">{adi}</p>
             
            </div>
            <button
              onClick={()=>onClose(false)}
              className="text-gray-400 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
          </div>


          <div className="flex-1 p-4 bg-gray-50 space-y-3 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-gray-500 italic">Henüz mesaj yok</p>
          ) : 
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.gonderenId === gonderenId ? 'justify-end' : 'justify-start'}`}
              >
                <div>
                  <div
                    className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                      msg.gonderenId === gonderenId
                        ? 'bg-purple-500 text-white rounded-tr-none'
                        : 'bg-gray-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </>
          
          }
           
    
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
      ) }
    </>
  );
};

export default MessagingUI;
