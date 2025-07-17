import React, { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const PortfolioContext = createContext();

const WorkContextProvider = ({ children }) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [Post, setPost] = useState([] || "");
    const [konusmalar, setKonusmalar] = useState([] || "");
    const [userList, setUsersList] = useState([] || "");
    const [firstNameLabel, setFirstName] = useState([] || "");
    
    const [messages, setMessages] = useState([]);
    const [users, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [ilanlar, setIlanlar] = useState([] || "");
    const [data, setData] = useState([]);
    const [detail, setDetail] = useState(null);
    const [details, setDetails] = useState(null);
    const userid = JSON.parse(localStorage.getItem("login"));
    const userId = userid?.result?._id;
    const formatToTurkishDate = (dateString) => {
        const options = {
            timeZone: "Europe/Istanbul",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        };
        return new Date(dateString).toLocaleDateString("tr-TR", options);
    };

    const navigate = useNavigate();

    const getPost = async () => {
        try {
            const response = await axios.get(`${baseUrl}/ilanlar`);
            setIlanlar(response.data);
        } catch (error) {
            console.error("Veri çekme hatası:", error);
        }
    };
    const searchPosts = async (searchQuery) => {
        try {
            const url = searchQuery
                ? `${baseUrl}/ilanlar?search=${encodeURIComponent(searchQuery)}`
                : getPost();

            const response = await axios.get(url);
            setIlanlar(response.data);
        } catch (error) {
            console.error("Arama sırasında hata:", error);
        }
    };
    const fetchResponse = async (userId) => {
        try {
            const response = await axios.get(`${baseUrl}/portfolyo/${userId}`);
            setData(response.data);
        } catch (error) {
            console.error("Veri çekme hatası:", error);
        }
    };

    const fetchPost = async (userId) => {
        try {
            const response = await axios.get(`${baseUrl}/ilanlarim/${userId}`);
            setPost(response.data);

        } catch (error) {
            console.error("Veri çekme hatası:", error);
        }
    };



    const createWork = async (post) => {
        try {
            const response = await axios.post(`${baseUrl}/portfolyo`, post);
            setData((prev) => Array.isArray(prev) ? [...prev, response.data] : [response.data]);

            navigate("/portfolyom");
        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    };

    const createWorkPost = async (post) => {
        try {
            const response = await axios.post(`${baseUrl}/ilanlarim`, post);
            setPost((prev) => Array.isArray(prev) ? [...prev, response.data] : [response.data]);

            navigate("/ilanlarim");
        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    };





    const deleteClickPost = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/ilanlarim/${id}`);
            setPost(response.data.filter((item) => item._id !== id))
            fetchPost()
        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    };
    const deleteClick = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/portfolyo/${id}`);
            setData(response.data.filter((item) => item._id !== id))
            fetchResponse()
        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    };





    const detailstPost = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/ilanlarim/${id}`);
            setDetails(response.data);
            fetchPost()
        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    };


    const detailsPortfolyo = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/portfolyo/${id}`);
            setDetail(response.data);
        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    };
    const detailsPost = async () => {
        try {

            const response = await axios.get(`${baseUrl}/duzenle/${userid.result.email}`);
            setEmail(response.data)

        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    }





    const fetchUpdated = async (id, formData) => {
        try {
            const response = await axios.put(`${baseUrl}/portfolyo/${id}`, formData);
            setData((prev) =>
                prev.map((item) => (item._id === id ? response.data : item))
            );
            navigate(-1)

        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    }
    const updatePost = async (id, post) => {
        try {
            const response = await axios.put(`${baseUrl}/ilanlarim/${id}`, post);
            setPost((prev) =>
                prev.map((item) => (item._id === id ? response.data : item))
            );
            navigate(-1)

        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    }
    const updatedPost = async (formData) => {
        try {

            const response = await axios.put(`${baseUrl}/duzenle/${userid.result.email}`, formData);

            setEmail(response.data);
            localStorage.setItem("login", JSON.stringify({ result: response.data }));

        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    }







    const registerPost = async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/uye-ol`, formData);
            setUser(response.data);
            navigate("/")

        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    }
    const LoginPost = async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/signin`, formData);
            
            localStorage.setItem("login", JSON.stringify(response.data))
            navigate('/ilanlar');
        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    }

    const hesabiDondur = async () => {
        try {
         
            await axios.get(`${baseUrl}/users/${userid.result.email}`);


        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    }
    const Message = async (gonderenId, aliciId) => {
        try {

            const response = await axios.get(`${baseUrl}/mesajlar/${gonderenId}/${aliciId}`)
  
            setMessages(response.data)

        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    }
    const getMessage = async (userId) => {
        try {

            const response = await axios.get(`${baseUrl}/konusmalar/${userId}`);
            setKonusmalar(response.data)

        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    }
    const usersListPerson = async (id) => {
        try {

            const response = await axios.get(`${baseUrl}/users/${id}`);
            setUsersList(response.data)

        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    }
    const usersLis = async () => {
        try {

            const response = await axios.get(`${baseUrl}/users`);
            setFirstName(response.data)

        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    }
    const handleDeleteMessagesData=async(currentId,targetId)=>{
        try {

            const response = await axios.get(`${baseUrl}/${currentId}/${targetId}`);
            setFirstName(response.data)

        } catch (error) {
            console.error("Post oluşturma hatası:", error);
        }
    }
    return (
        <PortfolioContext.Provider value={{handleDeleteMessagesData,firstNameLabel,usersListPerson,usersLis,userList, messages,getMessage, konusmalar, setMessages, Message, getMessage, searchPosts, getPost, ilanlar, userId, hesabiDondur, email, setEmail, detailsPost, updatedPost, LoginPost, users, registerPost, updatePost, details, detailsPortfolyo, detailstPost, createWorkPost, formatToTurkishDate, Post, setPost, deleteClickPost, fetchPost, data, detail, setData, fetchResponse, createWork, deleteClick, detailsPortfolyo, fetchUpdated, userid }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export default WorkContextProvider;
