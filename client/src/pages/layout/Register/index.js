import React, { useContext, useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link } from 'react-router-dom';
import {PortfolioContext} from "../../../Context/workContext"
const Index = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const {registerPost}=useContext(PortfolioContext)
    const [formData,setFormData]=useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "" 
    }
    )
  
    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.confirmPassword) {
            alert('Lütfen tüm alanları doldurun.');
            return; 
          }
      
          if (formData.password !== formData.confirmPassword) {
            alert('Şifreler uyusmuyor.');
            return; 
          }
      
        console.log(formData)
        await registerPost(formData)

    }
    return (
        <div className="bg-gray-200 min-h-screen flex justify-center items-center">

            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Kayıt Ol</h2>
                <div className='flex '>
                <div className="mb-4 mr-1">
                    <label className="block text-gray-600 font-semibold mb-1">Adı</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Adınızı girin"
                        className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-1">Soyadı</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Soyadınızı girin"
                        className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                </div>
            
                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-1">E-posta</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
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
                                   value={formData.password}
                                   onChange={handleChange}
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Parolanızı girin"
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
                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-1">Parola Tekrar</label>
                    <div className="relative">
                        <input
                     
                         name="confirmPassword"
                         value={formData.confirmPassword}
                         onChange={handleChange}
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Parolanızı tekrar girin"
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
                    <p className='text-right pt-4 text-gray-400'>zaten üye misin? <Link to="/" className="text-purple-300">Giriş yap</Link></p>
                </div>
                <button  type="submit" className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition mb-3">
                   Kayıt Ol
                </button>

           

                </form>
            </div>
     
           
        </div>
    );
};

export default Index;
