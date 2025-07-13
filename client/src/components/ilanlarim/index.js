import React, { useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PortfolioContext } from '../../Context/workContext';
import { useNavigate } from 'react-router-dom';
const Index = ({ posts }) => {
    const { deleteClickPost, fetchPost, formatToTurkishDate, userId } = useContext(PortfolioContext);

    const navigate = useNavigate();
    const handleEditClick = (id) => {
        navigate(`/ilanlarim/${id}`);
    };

    const userid = JSON.parse(localStorage.getItem("login"));

    useEffect(() => {


        fetchPost(userId)
    }, [])


    return (

<div className="flex flex-wrap gap-4 justify-start">
  {!posts || posts.length === 0 ? (
    <p className="text-center p-4 text-gray-500 italic w-full">
      Seçilen duruma göre portfolyo bulunamadı.
    </p>
  ) : (
    posts.map((p, index) => (
      <div
        key={index}
        className="relative bg-white rounded-lg shadow-md border p-4 flex flex-col w-full sm:w-[48%] md:w-[31%] lg:w-[23%]"
      >
        {userId === p.userId && (
          <div className="absolute top-2 right-2 rounded-lg p-2 flex space-x-2 bg-gray-800 rounded-bl-md z-10">
            <button className="text-gray-500 hover:text-white">
              <FontAwesomeIcon icon={faPen} className="p-2 cursor-pointer" onClick={() => handleEditClick(p._id)} />
            </button>
            <button className="text-gray-500 hover:text-white">
              <FontAwesomeIcon icon={faTrash} className="p-2 cursor-pointer" onClick={() => deleteClickPost(p._id)} />
            </button>
          </div>
        )}

        <div className="mt-6 h-[160px] w-full overflow-hidden">
          <img
            src={p.file}
            className="w-full h-full object-cover rounded-md"
            alt="İlan görseli"
          />
        </div>

        <div className="flex items-center justify-between mt-3 space-x-4">
          <div>
            <span className="font-semibold text-base text-gray-800">{userid?.result?.firstName}</span><br />
            <span className="text-sm text-gray-600">{p.selectedSubcategory}</span>
          </div>

          <div className="text-md font-bold text-purple-900 whitespace-nowrap">Fiyat: {p.fiyat}</div>
        </div>

        <p className="mt-4 text-gray-700 text-sm font-semibold truncate" title={p.title}>
          {p.title}
        </p>
        <p className="mt-2 text-gray-500 text-sm line-clamp-3">{p.description}</p>
      </div>
    ))
  )}
</div>


    )
}

export default Index
