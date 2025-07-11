import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaFileImage } from 'react-icons/fa';
import { PortfolioContext } from '../../../../Context/workContext';

const PortfolioForm = () => {
    const { id } = useParams();
    const { detailsPortfolyo, detail, fetchUpdated,userId } = useContext(PortfolioContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        durum: '',
        fiyat: '',
        description: '',
        file: '',
        currency: 'TL',
        selectedCategory: '',
        userId:userId
    });

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        detailsPortfolyo(id);
    }, [id]);


    useEffect(() => {
        if (detail) {
            setFormData({
                title: detail.title || '',
                durum: detail.durum || '',
                fiyat: detail.fiyat || '',
                description: detail.description || '',
                file: detail.file || '',
                currency: detail.currency || 'TL',
                selectedCategory: detail.selectedCategory || '',
            });
        }
    }, [detail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, file: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            (formData.title === '' || formData.durum === '' || formData.description === ''|| formData.file==='') ||
            Number(formData.fiyat) < 100
          ) {
            alert('Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!');
            return;
          }
        fetchUpdated(id, formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="max-w-8xl mx-auto space-y-6 h-auto px-[150px]">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-purple-600 hover:text-purple-800 py-5"
                    >
                        <FaArrowLeft className="mr-2" />
                        Geri Dön
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700">Kategori Seçimi</label>
                            <select
                                name="selectedCategory"
                                value={formData.selectedCategory}
                                onChange={handleChange}
                                className="w-full p-5 border-2 border-purple-300 rounded bg-white text-black"
                            >
                                <option value="">Seçiniz</option>
                                <option>Grafik & Tasarım</option>
                                <option>Yazı & Çeviri</option>
                                <option>Yazılım & Teknoloji</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold text-gray-700">
                                Başlığınızla ziyaretçiyi etkile*
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Portfolyonuz için başlık girin"
                                className="w-full p-5 border-2 border-purple-300 rounded bg-white text-black"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold text-gray-700">Durum*</label>
                            <input
                                type="text"
                                name="durum"
                                value={formData.durum}
                                onChange={handleChange}
                                placeholder="Portfolyonuz için durum girin"
                                className="w-full p-5 border-2 border-purple-300 rounded bg-white text-black"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="w-full">
                                <label className="block mb-1 font-semibold text-gray-700">Fiyat*</label>
                                <input
                                    type="number"
                                    name="fiyat"
                                    value={formData.fiyat}
                                    onChange={handleChange}
                                    placeholder="Portfolyonuz için fiyat girin"
                                    className="w-full p-5 border-2 border-purple-300 rounded bg-white text-black"
                                />
                            </div>
                            <div className="pt-7">
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    className="p-5 border-2 border-purple-300 rounded bg-white text-black"
                                >
                                    <option value="TL">TL</option>
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Portfolyonuzu Detaylıca Açıklayın*
                        </label>
                        <textarea
                            name="description"
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Detaylı açıklama girin"
                            className="w-full p-5 border-2 border-purple-300 rounded bg-white text-black"
                        />
                    </div>

                    {formData.file && (
                        <div className="justify-center flex">
                            <img src={formData.file} width="400" height="400" className="border-2 border-dashed" />
                        </div>
                    )}

                    <div className="border-2 border-dashed border-purple-300 p-4 rounded bg-gray-100 flex justify-center">
                        <div className="py-5">
                            <label className="block mb-2 font-semibold text-gray-700 text-center">Dosya Seç</label>
                            <div className="flex justify-center">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="text-black file:bg-purple-600 file:text-white file:rounded file:px-4 file:py-2 file:border-0 file:cursor-pointer"
                                    accept="image/png, image/jpeg"
                                />
                            </div>

                            <div className="py-3 flex items-center justify-center">
                                <span className="text-sm text-gray-500">JPG, PNG dosyalarını yükleyebilirsin</span>
                                <FaFileImage className="text-gray-400 text-2xl pl-3" />
                            </div>
                        </div>
                    </div>
                </div>

<div className='flex justify-center pt-5'>

<button
                        type="submit"
                        className=" mt-4 bg-gray-800 text-white rounded hover:bg-gray-700 px-10 py-3"
                    >
                        Güncelle
                    </button>
</div>
                </form>

        </>
    );
};

export default PortfolioForm;
