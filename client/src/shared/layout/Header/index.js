import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faComment,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '@/features/auth/pages/Profile';
import { Button,Input } from '@/shared/components/atoms';

export default function Header() {

  const [search, setSearch] = useState("");
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
      <div className="flex flex-wrap items-center gap-4 p-4 md:p-2">

        <div className="order-1">
          <Button
          onClick={() => Navigate("/workist")}
          className="text-purple-950 font-bold uppercase cursor-pointer hover:text-gray-500"
           >workist</Button>

        </div>


        <div className="order-3 md:order-2 w-full md:w-auto md:flex-1 flex flex-col sm:flex-row items-center justify-center gap-2">

          <div className="relative w-full max-w-lg">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              type="text"
              placeholder="Arama yap..."
              className="pl-10 w-full border-b-2 border-gray-300 rounded-md py-2 outline-none  focus:ring-2 focus:ring-purple-950"
            />

          </div>
          <div className="flex justify-center gap-6 text-md text-purple-950 py-2 sm:p-5">
            <Link to="/yapilacaklar">
              <FontAwesomeIcon icon={faBook} className="hover:text-purple-600 " />
            </Link>

            <FontAwesomeIcon icon={faComment} className="hover:text-purple-600 cursor-pointer" onClick={()=>Navigate("/sohbet")} />
          </div>


        </div>


        <div className="order-2 md:order-3 ml-auto md:ml-0 flex justify-end">
          <Profile />
        </div>
      </div>
      <hr />
      <ul className='flex flex-wrap justify-around items-center gap-x-4 gap-y-2 text-gray-400 capitalize p-3 md:p-5'>
        {subcategories && subcategories.map((item) => (
          <li key={item.category} className="relative z-10">
            <div
              className="cursor-pointer"
              onClick={() => setCategories(prev => prev === item.category ? false : item.category)}
            >
              {item.category}
            </div>


            {categories === item.category && (
              <ul className="absolute top-full left-0 bg-white shadow-md rounded mt-2   min-w-[200px]  text-gray-400">
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


