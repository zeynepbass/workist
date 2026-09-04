import React, { useState,useContext,useEffect } from "react";
import {PortfolioContext} from "../../../../Context/workContext"
const ContactSettings = () => {
  const {email,detailsPost}=useContext(PortfolioContext)
  const [editMode, setEditMode] = useState(false);
  const { updatedPost } = useContext(PortfolioContext)
    const [formData,setFormData]=useState({
        email: "",
        tel: ""
    }
    )


const handleChange=(e)=>{
  setFormData({...formData,[e.target.name]: e.target.value})
}
  const handleSave = () => {
    updatedPost(formData)
    setEditMode(false);
  };
  useEffect(() => {
    detailsPost();
  }, []);
  useEffect(() => {
    if (email) {
      setFormData({
    
        email: email.email || "",
        tel: email.tel || ""
      });
    }
  }, [email]);

  return (
    <div className="bg-white p-4 rounded-[10px] shadow">
      <div className="flex justify-between items-center">
        <h6 className="text-left text-gray-600">İletişim <strong>Ayarları</strong></h6>
        <button onClick={() => setEditMode(!editMode)} className="text-purple-600">
          {editMode ? "İptal" : "Düzenle"}
        </button>
      </div>

      <div className="mt-4 space-y-2 text-gray-600">
        {editMode ? (
          <>
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm">E-posta</label>
              <input
                type="email"
                className="border p-2 rounded"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <hr />
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm">Cep Tel</label>
              <input
                type="text"
                className="border p-2 rounded"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
              />
            </div>
            <button
              onClick={handleSave}
              className="mt-3 bg-purple-600 text-white px-4 py-1 rounded w-fit"
            >
              Kaydet
            </button>
          </>
        ) : (
          <>
            <div>
              <span className=" text-gray-400 text-lg">E-posta</span>
              <span className='pl-5 text-lg'>{email.email}</span>
            </div>
            <hr />
            <div>
              <span className=" text-gray-400 text-lg">Cep Tel</span>
              <span className='pl-5 text-lg'>{email.tel}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactSettings;
