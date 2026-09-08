
import Ads from "@/features/ads/pages/AdsPage"
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useEffect, useMemo, useState } from 'react'
import { PortfolioContext } from '../../../../Context/workContext'
import Message from "@/features/messages/pages/Message";
const Index = () => {
  const [selectedAliciId, setSelectedAliciId] = useState(null);

  const { ilanlar, Post, getPost, fetchPost, formatToTurkishDate } = useContext(PortfolioContext);
  const userid = JSON.parse(localStorage.getItem("login"));
  const Navigate = useNavigate();
  useEffect(() => {
    getPost();
    fetchPost(userid?.result?._id);
  }, []);

  const filteredData = useMemo(() => {
    const selectedCategories = Post.map((item) => item.selectedCategory);
    return ilanlar.filter((item) =>
      selectedCategories.includes(item.selectedCategory) &&
      item.userId !== userid?.result?._id 
    );
  }, [ilanlar, Post, userid]);
  

  const [expandedItems, setExpandedItems] = useState({});

  const toggleText = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const users = JSON.parse(localStorage.getItem("login"))
  const lastItem = [...filteredData][0]
  const [istek, setIstek] = useState(false)


  const [open, setOpen] = useState(false)

  return (
    <div className="w-[80%]  px-20 relative">
      <div className='flex justify-left pl-2 items-center '>
        {users?.result?.file ? <img className='rounded-full p-3 h-40 w-40' src={users?.result?.file} alt="" /> : null}

        <ul className='pl-5'>
          <li className='text-gray-800' style={{ fontSize: "30px" }}>Merhaba <strong>{users?.result?.firstName} 👋</strong></li>
          <li className='text-gray-800' style={{ fontSize: "20px", fontFamily: "monospace" }}>Bionluk'a tekrar hoş geldin!</li>
        </ul>

      </div>

      <div className='flex justify-between pt-5'>
        <span className='text-left text-gray-400'> Sana Özel <strong>Alıcı İstekleri <span
          className='text-purple-600 cursor-pointer'
          onClick={() => setIstek(true)}
        >
          &nbsp;[20 alıcı isteği]
        </span>
        </strong></span>

        <span className='text-right'> <Link to="/istekler" className="rounded-full text-gray-300 text-right p-2 cursor-pointer" > Tümü</Link> </span></div>     <br />
      {istek === false ? (<>
        {lastItem ? (
          <div className="bg-gray-50 rounded-lg shadow mt-3">
            <div className="flex items-center justify-between mb-2 bg-gray-800 p-4 rounded-md">
              <div className="flex">
                {lastItem?.file ? <img
                  className="rounded-full w-20 h-20 mr-3 text-white"
                  src={lastItem.file}
                  alt=" Fotoğraf"
                />
                  : ""}

                <p>
                  <span className="text-sm font-semibold text-white">
                  {lastItem?.kullaniciAd}
                  </span>
                  <br />
                  <span className="text-xs text-white">{lastItem.selectedSubcategory}</span>
                </p>
              </div>

              <div className="flex justify-end space-x-2 mt-4 p-4">
            

              <button
                      className="border border-gray-300 px-3 py-1 rounded text-sm text-white hover:bg-gray-100"

                      onClick={() => {
                        setOpen(false); 
                        setSelectedAliciId(lastItem?.userId);
                      
                        setTimeout(() => {
                          setOpen(true);
                        }, 0);
                      }}
                      
                    >
                      Mesaj At
                    </button>

              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 p-4">{lastItem.title}</h3>

            <p className="text-gray-700 text-sm mb-2 p-4">
              {expandedItems[lastItem._id]
                ? lastItem.description
                : `${lastItem.description.slice(0, 400)}...`}
            </p>

            {lastItem.description.length > 400 && (
              <p
                className="text-purple-500 font-semibold text-sm cursor-pointer p-4"
                onClick={() => toggleText(lastItem._id)}
              >
                {expandedItems[lastItem._id] ? "Gizle" : "Devamını oku"}
              </p>
            )}

            <hr />

            <div className="flex justify-between items-center mt-4 text-sm text-gray-600 p-4">
              <span className="bg-gray-100 px-2 py-1 rounded text-gray-500">
                {formatToTurkishDate(lastItem.createdAt)}
              </span>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-1">
                  <span>
                    Bütçe: <strong>{lastItem.fiyat}</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>
                    Süre: <strong>{lastItem.sure}</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>
                    Teklifler: <strong>10</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Son veri bulunamadı.</p>
        )}
{open && selectedAliciId === lastItem.userId && (
  <Message
    onClose={setOpen}
    adi={lastItem?.kullaniciAd}
    open={open}
    gonderenId={userid?.result?._id}
    aliciId={selectedAliciId}
  />
)}

      </>) : (

        <>
          {filteredData.map((item) => {
            return (
              <div className="bg-gray-50 rounded-lg  shadow mt-3">

                <div className="flex items-center justify-between mb-2 bg-gray-800 p-4 rounded-md">
                  <div className="flex">
                    <img
                      src={item?.file}
                          alt=" Fotoğraf"
                      className="rounded-full w-20 h-20 mr-3 text-white"
                    />
                    <p>
                      <span className="text-sm font-semibold text-white">
                        {item?.kullaniciAd}
                      </span>
                      <br />
                      <span className="text-xs text-white">{item.selectedSubcategory}</span>
                    </p>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4 p-4">
                    <button
                      className="border border-gray-300 px-3 py-1 rounded text-sm text-white hover:bg-gray-100"

                      onClick={() => {
                        setOpen(false); 
                        setSelectedAliciId(item?.userId);
                      
                        setTimeout(() => {
                          setOpen(true);
                        }, 0);
                      }}
                      
                    >
                      Mesaj At
                    </button>


                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 p-4">{item.title}</h3>

                <p className="text-gray-700 text-sm mb-2 p-4">
                  {expandedItems[item._id]
                    ? item.description
                    : `${item.description.slice(0, 400)}...`}
                </p>

                {item.description.length > 400 && (
                  <p
                    className="text-purple-500 font-semibold text-sm cursor-pointer p-4"
                    onClick={() => toggleText(item._id)}
                  >
                    {expandedItems[lastItem._id] ? "Gizle" : "Devamını oku"}
                  </p>
                )}

                <hr />

                <div className="flex justify-between items-center mt-4 text-sm text-gray-600 p-4">
                  <span className="bg-gray-100 px-2 py-1 rounded text-gray-500">
                    {formatToTurkishDate(item.createdAt)}
                  </span>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-1">
                      <span>
                        Bütçe: <strong>{item.fiyat}</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>
                        Süre: <strong>{item.sure}</strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>
                        Teklifler: <strong>10</strong>
                      </span>
                    </div>
                  </div>
                </div>
                {open && selectedAliciId === item.userId && (
  <Message
    onClose={setOpen}
    adi={item?.kullaniciAd}
    open={open}
    gonderenId={userid?.result?._id}
    aliciId={selectedAliciId}
  />
)}



              </div>

            )
          })}

        </>

      )}



      <br />
      <div className="flex justify-between items-center pt-5">
        <h6 className="text-center text-gray-600">Yayındaki <strong>İlanlarım</strong></h6><br />

        <span> <h3 className='text-purple-300 text-right cursor-pointer' onClick={() => Navigate("/Ads")}>Tüm ilanlarım</h3></span>
      </div>

      <Ads />





    </div>

  )
}

export default Index
