import React, { useContext, useState, useEffect } from "react";
import Modal from "../../../components/IlanlanlarimModal";
import Ilanlarim from "../../../components/ilanlarim";
import { PortfolioContext } from '../../../Context/workContext';

const Index = () => {
  const { Post } = useContext(PortfolioContext);
  const [sortType, setSortType] = useState("all");
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    if (!Post || !Array.isArray(Post)) return;

    let sorted = [...Post];

    if (sortType === "oldToNew") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortType === "newToOld") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setSortedPosts(sorted);
  }, [Post, sortType]);

  const handleChange = (e) => {
    setSortType(e.target.value);
  };

  return (
    <div className="p-4 h-[100vh]">
      <h1 className="text-left text-gray-500 text-xl pl-4">
        İş <strong>İlanlarım</strong>
      </h1>

      <Modal />
      <p className="text-gray-400 p-4">
        Tüm iş ilanlarını buradan takip edebilir, yönetebilir ve yeni iş ilanları oluşturabilirsin.
      </p>

      <div className="max-w-md p-4">
        <label htmlFor="sort" className="block mb-2 font-semibold text-gray-400">
          İlanları Sırala:
        </label>
        <select
          id="sort"
          value={sortType}
          onChange={handleChange}
          className="w-full border p-4 border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">Tüm İlanlar Göster</option>
          <option value="oldToNew">Eskiden Yeniye Göster</option>
          <option value="newToOld">Yeniden Eskiye Göster</option>
        </select>

        <p className="mt-4 text-gray-600">
          Seçilen sıralama:{" "}
          <span className="font-semibold">
            {sortType === "all"
              ? "Tüm İlanlar Göster"
              : sortType === "oldToNew"
              ? "Eskiden Yeniye Göster"
              : "Yeniden Eskiye Göster"}
          </span>
        </p>
      </div>


      <Ilanlarim posts={sortedPosts.length ? sortedPosts : Post} />
    </div>
  );
};

export default Index;
