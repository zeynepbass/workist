import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaInfoCircle, FaLightbulb } from 'react-icons/fa';
import { PortfolioContext } from '../../../../Context/workContext';

const HizmetFormu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { details, detailstPost, updatePost,userId } = useContext(PortfolioContext);

  const [title, setTitle] = useState('Ben,');
  const [form, setForm] = useState({
    fiyat:'',
    file:'',
    revizyon:'',
    sure:'',
    hizmetTuru: '',
    kodFiyatlandirma: {
      logo: false,
      kaynakKod: false,
      fonMuzigi: false,
    },
    ekstraOzellikler: {
      hizliTeslimat: false,
      fullHd: false,
    },
    description: ''
  });

  useEffect(() => {
    detailstPost(id);
  }, [id]);

  useEffect(() => {
    if (details) {
      setTitle(details.title || '');

      setForm({
        sure:details.sure || '',
        fiyat: details.fiyat || '',
        hizmetTuru: details.hizmetTuru || '',
        kodFiyatlandirma: {
          logo: Array.isArray(details.kodFiyatlandirma) ? details.kodFiyatlandirma.some(item => item.text === 'logo') : false,
          kaynakKod: Array.isArray(details.kodFiyatlandirma) ? details.kodFiyatlandirma.some(item => item.text === 'kaynakKod') : false,
          fonMuzigi: Array.isArray(details.kodFiyatlandirma) ? details.kodFiyatlandirma.some(item => item.text === 'fonMuzigi') : false,
        },        
        ekstraOzellikler: {
          hizliTeslimat: details.extra?.includes('hizliTeslimat') || false,
          fullHd: details.extra?.includes('fullHd') || false,
        },        
        revizyon: details.revizyon || '',
        file:details.file || '',
        description: details.description || ''
      });
    }
  }, [details]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCheckboxChange = (section, key) => {
    setForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
  
    if (
      (form.file=='' ||  form.sure==='' || form.title==='' || form.hizmetTuru === '' || form.revizyon === '' || form.description === '' || form.file==='') ||
      Number(form.fiyat) < 100
    ) {
      alert('Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!');
      return;
    }
    
    const kodFiyatlandirmaCount = Object.values(form.kodFiyatlandirma).filter(Boolean).length;
    const ekstraOzelliklerCount = Object.values(form.ekstraOzellikler).filter(Boolean).length;
    const totalSelectedCount = kodFiyatlandirmaCount + ekstraOzelliklerCount;
  
    const basePrice = Number(form.fiyat) || 0;
    const toplamFiyat = basePrice + totalSelectedCount * 100;
  
    const kodFiyatlandirma = Object.entries(form.kodFiyatlandirma)
      .filter(([_, value]) => value)
      .map(([key]) => ({ text: key }));
  
    const extra = Object.entries(form.ekstraOzellikler)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(',');
  
    const newIlan = {
      fiyat: toplamFiyat,  
      sure:form.sure, 
      hizmetTuru: form.hizmetTuru,
      title: title,
      description: form.description,
      revizyon: form.revizyon,
      file: form.file, 
      kodFiyatlandirma,
      extra,
      selectedCategory: 'Web',
      selectedSubcategory: 'Frontend',
      userId:userId
    };
  
    updatePost(id, newIlan);
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-6 text-black h-[auto]">
      <button onClick={handleBack} className="flex items-center text-purple-600 hover:text-purple-800 py-5">
        <FaArrowLeft className="mr-2" />
        Geri Dön
      </button>

      <div className="bg-purple-400 text-white p-4 rounded border-2 border-purple-400 flex items-start space-x-2">
        <FaInfoCircle className="text-2xl text-purple-600 pr-1" />
        <p>
          <strong>Seni dinledik!</strong> Artık minimum ilan & sipariş tutarı <strong>100 TL</strong>!
        </p>
      </div>

      <div className="flex items-start space-x-2 text-yellow-500 bg-yellow-100 p-4 rounded border border-yellow-300">
        <FaLightbulb className="text-2xl text-yellow-500 pr-3" />
        <p>
          <strong>Lütfen Dikkat:</strong> Kategori veya hizmet türünü değiştirirsen, tüm paket fiyatlama bilgilerin sıfırlanır.
        </p>
      </div>


      <div>
        <label className="block mb-1 font-semibold text-gray-400">Hizmet Türü*</label>
        <select
          value={form.hizmetTuru}
          onChange={e => setForm({ ...form, hizmetTuru: e.target.value })}
          className="w-full p-5 border-2 border-purple-300 rounded bg-white text-black"
        >
          <option value="">Seçiniz</option>
          <option>Admin Panel</option>
          <option>Özel kodlanmış web tasarımı</option>
          <option>Hata Giderme</option>
        </select>
      </div>


      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-500">Kod Fiyatlandırma*</h3>
        <div className="flex flex-col space-y-3">
          {['logo', 'kaynakKod', 'fonMuzigi'].map((item) => (
            <label key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.kodFiyatlandirma[item]}
                onChange={() => handleCheckboxChange('kodFiyatlandirma', item)}
              />
              <span>{item === 'kaynakKod' ? 'Kaynak Kod' : item === 'fonMuzigi' ? 'Fon Müziği' : 'Logo'}</span>
            </label>
          ))}
        </div>
      </div>


      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-500">Extra*</h3>
        <div className="flex flex-col space-y-3">
          {['hizliTeslimat', 'fullHd'].map((item) => (
            <label key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.ekstraOzellikler[item]}
                onChange={() => handleCheckboxChange('ekstraOzellikler', item)}
              />
              <span>{item === 'hizliTeslimat' ? 'Süper Hızlı Teslimat' : 'Full HD (1080px)'}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Revizyon*
        </label>
        <input
          type="number"
          value={form.revizyon}
          onChange={e => setForm({ ...form, revizyon: e.target.value })}
          className="w-full p-5 border-2 border-purple-300 rounded bg-white text-black"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Süre*
        </label>
        <input
          type="text"
          value={form.sure}
          onChange={e => setForm({ ...form, sure: e.target.value })}
          className="w-full p-5 border-2 border-purple-300 rounded bg-white text-black"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Fiyat*
        </label>
        <p className="mt-2 text-sm text-gray-500">
  Toplam fiyat (seçimler dahil): {Number(form.fiyat || 0) + Object.values(form.kodFiyatlandirma).filter(Boolean).length * 100 + Object.values(form.ekstraOzellikler).filter(Boolean).length * 100} TL
</p>

        <input
          type="number"
          min={100}  
          value={form.fiyat}
          onChange={e => setForm({ ...form, fiyat: e.target.value })}
          className="w-full p-5 border-2 border-purple-300 rounded bg-white text-black"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Başlığınızla ziyaretçiyi etkile*
        </label>
        <p className="text-gray-500 flex items-start">
          <FaLightbulb className="text-2xl text-yellow-500 pr-3" />
          "Ben web sitenizi özgün tasarımlar eşliğinde yönetebileceğiniz hale getiriyorum" gibi bir cümle önerilir.
        </p>
        <br />
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-5 border-2 border-purple-300 rounded bg-white text-black"
        />
      </div>


      <div>
        <label className="block mb-1 font-semibold text-gray-500">
        Siparişe başlaman için gerekenler*
        </label>
        <textarea
          rows={5}
          placeholder="Yapacağın işin detaylarını açıkla..."
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full p-4 border-2 border-purple-300 rounded bg-white text-black"
        />
      </div>

      <div>
                  <label className="block font-semibold text-gray-700 mb-1">Dosya Yükle</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setForm({ ...form, file: reader.result });
                      };
                      if (file) reader.readAsDataURL(file);
                    }}
                  />
                </div>


      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-purple-600 text-white px-8 py-3 rounded hover:bg-purple-700"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default HizmetFormu;
