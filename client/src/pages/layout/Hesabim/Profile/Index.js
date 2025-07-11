import React, { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../../../../Context/workContext"
const ProfileInfoCard = () => {
  const { email, detailsPost } = useContext(PortfolioContext)
  const [editMode, setEditMode] = useState(false);
  const { updatedPost } = useContext(PortfolioContext)
  const [formData, setFormData] = useState({
    file: "",
    unvan: "",
    firstName: "",
    lastName: "",
    hakkimda: ""
  }
  )


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
        file: email.file || "",
        firstName: email.firstName || "",
        lastName: email.lastName || "",


        unvan: email.unvan || "",
        hakkimda: email.hakkimda || ""
      });
    }
  }, [email]);
  return (
    <div className="bg-white p-4 rounded-[10px] shadow ">
      <div className="flex justify-end items-center">
     
<button onClick={() => setEditMode(!editMode)} className="text-purple-600" >
          {editMode ? "İptal" : "Düzenle"}
        </button>
      </div>
      <br />
      {editMode ? (
        <>
          <img src={formData.file} width="100" height="100" className="rounded-full shadow-lg" />

          <input
            type="file"
            className="m-5"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setFormData({ ...formData, file: reader.result });
              };
              if (file) reader.readAsDataURL(file);
            }}
          />
  
            <input
              type="text"
              className="border p-2 w-full mb-2"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="adınızı girin"
            />
            <input
              type="text"
              className="border p-2 w-full mb-2"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
  
              placeholder="soyadınızı girin"
            />
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="ünvanınızı girin"
              name="unvan"
              value={formData.unvan}
              onChange={handleChange}
            />
            <textarea
              className="border p-2 w-full mb-2"
              rows={4}
              name="hakkimda"
                      placeholder="kendinizden bahsedin"
              value={formData.hakkimda}
              onChange={handleChange}
            />
            <button onClick={handleSave} className="bg-purple-600 text-white px-4 py-1 rounded">
              Kaydet
            </button>
          </>
          ) : (
          <>
          <div>  <img src={formData.file} width="100" height="100" className="rounded-full shadow-lg" /></div>
          <br/>  <p>{email.firstName} {email.lastName}</p>
            <p className="text-gray-400 italic">{email.unvan}</p>
            <br />
            <h5 className="text-purple-700">
              <strong>{email.unvan}</strong>
            </h5>
            <p className="text-sm text-gray-400 pt-2">{email.hakkimda}</p>
          </>
      )}
        </div>
      );
};

      export default ProfileInfoCard;
