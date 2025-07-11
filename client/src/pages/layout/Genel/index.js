import React, { useContext, useEffect } from 'react';
import { PortfolioContext } from '../../../Context/workContext';
import { useLocation } from 'react-router-dom';
const Index = () => {
  const { ilanlar, formatToTurkishDate, searchPosts } = useContext(PortfolioContext);
  const userid = JSON.parse(localStorage.getItem("login"));
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    searchPosts(searchQuery || "");
  }, [searchQuery]);
  return (
    <>
      <h1 className="text-gray-700 text-2xl font-semibold mb-6 text-left">
        Workis'te Nelere <span className="text-purple-700">Yapıldı 🧙‍♂️</span>
        <h1 className="text-xl text-gray-400 mb-5">
          {searchQuery ? `${searchQuery} için sonuçlar:` : "Tüm İlanlar"}
        </h1>
      </h1>
      <div className="p-4 flex flex-wrap gap-1 justify-start h-[100vh] overflow-auto">

        {ilanlar.length === 0 ? (
          <p className="text-gray-500 italic">Gösterilecek portfolyo bulunamadı.</p>
        ) : (
          ilanlar.map((p, index) => (
            <div
            key={index}
            className="relative bg-white rounded-lg shadow-md border w-full sm:w-1/4 p-4 flex flex-col"
          >
            <span className="bg-gray-100 w-1/2 rounded text-gray-500 text-center ml-auto block text-sm py-1">
              {formatToTurkishDate(p.createdAt)}
            </span>
          
            <div className="mt-3 p-2 h-[20vh] flex flex-col">
              <div className="flex-1 overflow-hidden">
                <img
                  src={p.file}
                  className="w-full h-full object-contain rounded-md"
                  alt="İlan görseli"
                />
              </div>
          
              <div className="flex items-center justify-between mt-2 space-x-4">
                <div>
                  <span className="font-semibold text-lg text-gray-800">{userid?.result?.firstName}</span><br />
                  <span className="font-semibold text-md text-gray-600">{p.selectedSubcategory}</span>
                </div>
          
                <div className="text-lg font-bold text-purple-900">fiyat: {p.fiyat}</div>
              </div>
            </div>
          
            <p className="mt-3 text-gray-500 text-sm pl-1 font-semibold">{p.title}</p>
            <p className="text-gray-400 text-sm pl-1 truncate">{p.description}</p>
          </div>
          
          ))
        )}
      </div>
    </>
  );
};

export default Index;
