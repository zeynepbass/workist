import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faComment,
  faBell,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../../Profile';
const notifications = [
  { id: 1, title: 'Yeni mesajınız var.', time: '2 dakika önce' },
  { id: 2, title: 'Profiliniz güncellendi.', time: '1 saat önce' },
  { id: 3, title: 'Yeni bir görev eklendi.', time: 'Dün' },
];
const   Index = () => {

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const panelRef = useRef();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const Navigate = useNavigate()
  const subcategories = [
    {
      category: 'Grafik & Tasarım',
      items: ['Logo Tasarımı', 'Afiş Tasarımı', 'Sosyal Medya Postu'],
    },
    {
      category: 'Yazı & Çeviri',
      items: ['Makale', 'Blog Yazısı', 'Kitap Çevirisi'],
    },
    {
      category: 'Yazılım & Teknoloji',
      items: ['Web Uygulaması', 'Mobil Uygulama', 'API Geliştirme'],
    }
  ];
  const handleSearch = () => {
    if (search.trim()) {
      Navigate(`/ilanlar?search=${encodeURIComponent(search.trim())}`);
    }
  };
  

  const [categories, setCategories] = useState(false)
  return (
    <div className="border-b-2 ">
      <div className="grid grid-cols-12 items-center gap-4 ">

        <div className="col-span-2">
          <h1 className="text-purple-950 font-bold uppercase cursor-pointer" onClick={() => Navigate("/workist")}>workist</h1>
        </div>


        <div className="col-span-7 flex flex-row items-center justify-center">

          <div className="relative w-full max-w-lg">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              type="text"
              placeholder="Arama yap..."
              className="pl-10 w-full border-b-2 border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>
          <div className="flex justify-center gap-6 mt-2 text-xl text-gray-500 pl-5">
            <Link to="/yapilacaklar">
              <FontAwesomeIcon icon={faBook} className="hover:text-purple-600" />
            </Link>

            <div className="relative" ref={panelRef}>
              <FontAwesomeIcon
                icon={faBell}
                onClick={() => setOpen(!open)}
                className="hover:text-purple-600 cursor-pointer text-xl"
              />

              {open && (
                <div className="absolute right-0 mt-2 h-[25vh] overflow-y-auto w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                  <div className="p-4 border-b text-sm font-semibold text-gray-400">
                    Bildirimler
                  </div>
                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <li className="px-4 py-2 text-sm text-gray-500">Henüz bildiriminiz yok.</li>
                    ) : (
                      notifications.map((n) => (
                        <li key={n.id} className="px-4 py-2 hover:bg-gray-50 border-b">
                          <p className="text-sm text-purple-700">{n.title}</p>
                          <span className="text-xs text-gray-400">{n.time}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
            <FontAwesomeIcon icon={faComment} className="hover:text-purple-600 cursor-pointer" />
          </div>


        </div>


        <div className="col-span-3 flex justify-end">
          <Profile />
        </div>
      </div>
      <hr />
      <ul className='flex justify-around items-center text-gray-400 capitalize p-5'>
        {subcategories && subcategories.map((item) => (
          <li key={item.category} className="relative z-10">
            <div
              className="cursor-pointer"
              onClick={() => setCategories(prev => prev === item.category ? false : item.category)}
            >
              {item.category}
            </div>


            {categories === item.category && (
              <ul className="absolute top-full left-0 bg-white shadow-md rounded mt-2  text-black min-w-[200px]  text-gray-400">
                {item.items.map((subItem, idx) => ( 

  
                  <li key={idx} className="p-5 hover:bg-gray-200 cursor-pointer" onClick={()=>   Navigate(`/ilanlar?search=${encodeURIComponent(subItem)}`)}>
                    {subItem}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Index;
