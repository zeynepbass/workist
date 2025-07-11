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


        <div className="flex flex-wrap gap-1">
            {!posts || posts.length === 0 ? (
                <p className="text-center p-4 text-gray-500 italic w-full">
                    Seçilen duruma göre portfolyo bulunamadı.
                </p>
            ) : (
                posts.map((p, index) => (
                    <div
                        key={index}
                        className="relative bg-white rounded-lg shadow-md border w-full sm:w-1/4 p-4 flex flex-col"
                    >
                        {userId === p.userId ?
                            <div className="absolute top-2 right-2 rounded-lg p-2 flex space-x-2 bg-gray-800 rounded-bl-md z-10 ">


                                <button className="text-gray-500 hover:text-white">
                                    <FontAwesomeIcon icon={faPen} className="p-2 cursor-pointer" onClick={() => handleEditClick(p._id)} />

                                </button>

                                <button className="text-gray-500 hover:text-white">
                                    <FontAwesomeIcon icon={faTrash} className="p-2 cursor-pointer" onClick={() => deleteClickPost(p._id)} />
                                </button>
                            </div> : null}

                        <div className="mt-6 p-4 h-[15vh]">
                            <div className="w-full h-[100%] overflow-hidden">
                                <img
                                    src={p.file}
                                    className="w-full h-full object-contain rounded-md"
                                    alt="İlan görseli"
                                />
                            </div>

                            <div className="flex items-center justify-between mt-3 space-x-4">
                                <div>
                                    <span className="font-semibold text-lg text-gray-800">{userid?.result?.firstName}</span><br />
                                    <span className="font-semibold text-md text-gray-600">{p.selectedSubcategory}</span><br />

                                </div>

                                <div className="text-lg font-bold text-purple-900">fiyat:{p.fiyat}</div>

                            </div>
                        </div>



                        <br />
                        <br />
                        <p className="mt-4 text-gray-400 text-sm pl-4 pt-2">{p.title}</p>
                        <p className="mt-4 text-gray-400 text-sm pl-4 ">{p.description}</p>
                    </div>
                ))
            )}
        </div>



    )
}

export default Index
