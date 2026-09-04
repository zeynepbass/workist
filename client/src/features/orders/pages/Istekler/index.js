import React, { useContext, useEffect, useMemo, useState } from 'react'
import { PortfolioContext } from '../../../../Context/workContext'
import Istekler from "../../components/Istekler"
const Index = () => {
    const { ilanlar, Post, getPost, fetchPost, formatToTurkishDate } = useContext(PortfolioContext);
    const userid = JSON.parse(localStorage.getItem("login"));

    useEffect(() => {
        getPost();
        fetchPost(userid?.result?._id);
    }, []);

    const filteredData = useMemo(() => {
        const selectedCategories = Post.map((item) => item.selectedCategory);
        return ilanlar.filter((item) =>
            selectedCategories.includes(item.selectedCategory)
        );
    }, [ilanlar, Post]);

    const [expandedItems, setExpandedItems] = useState({});

    const toggleText = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="mx-auto p-4 rounded-lg h-[100vh] overflow-auto">
          <h2 className="text-2xl font-semibold text-gray-500 mb-1">
            Bana Uygun <span className="text-gray-600 font-bold">Alıcı İstekleri</span>
          </h2>
          <p className="text-gray-500 mb-4">
            Hizmet verdiğin kategorilerle en iyi eşleşen alıcı isteklerini senin için toparladık. 😉
          </p>
          <Istekler toggleText={toggleText}
        filteredData={filteredData}
        formatToTurkishDate={formatToTurkishDate} getPost={getPost} fetchPost={fetchPost} expandedItems={expandedItems} userid={userid} />
        </div>
      );
      
};


export default Index
