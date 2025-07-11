import React, { useState, useContext } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { PortfolioContext } from '../../../Context/workContext';
const Index = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const Navigate = useNavigate()
  const { LoginPost } = useContext(PortfolioContext)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  }
  )

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    await LoginPost(formData)

  }
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Giriş Yap</h2>
        <form onSubmit={handleSubmit}>


          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">E-posta</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="E-posta adresiniz"
              className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">Parola</label>
            <div className="relative">
              <input
                name="password"

                onChange={handleChange}
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Parolanız"
                className="w-full p-3 border rounded border-gray-300 pr-16 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-purple-600 hover:underline"
              >
                {passwordVisible ? <FontAwesomeIcon
                  icon={faEyeSlash}
                  size="lg"
                /> :
                  <FontAwesomeIcon
                    icon={faEye}
                    size="lg"
                  />}



              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition mb-3">
            Giriş Yap
          </button>
        </form>


        <button className="w-full bg-gray-100 text-gray-700 py-3 rounded border hover:bg-gray-200 transition mb-3" onClick={() => Navigate("kayit-ol")}>
          Kayıt Ol
        </button>

        <button className="w-full bg-white text-black py-3 rounded border flex justify-center items-center gap-2 hover:bg-gray-100 transition">
          <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
          Google ile Devam Et
        </button>
      </div>
    </div>
  );
};

export default Index;
