import React, { useContext, useState } from 'react';
import { PortfolioContext } from '../../Context/workContext';

const PortfolioModal = () => {
  const { createWorkPost,userId,userid} = useContext(PortfolioContext);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const subcategories = {
    'Grafik & Tasarım': ['Logo Tasarımı', 'Afiş Tasarımı', 'Sosyal Medya Postu'],
    'Yazı & Çeviri': ['Makale', 'Blog Yazısı', 'Kitap Çevirisi'],
    'Yazılım & Teknoloji': ['Web Uygulaması', 'Mobil Uygulama', 'API Geliştirme'],
  };

  const [formData, setFormData] = useState({
    sure:'',
    description: '',
    fiyat: '',
    kodFiyatlandirma: {
      logo: false,
      kaynakKod: false,
      fonMuzigi: false,
    },
    ekstraOzellikler: {
      hizliTeslimat: false,
      fullHd: false,
    },
    revizyon: '',
    title: 'Ben,',
    hizmetTuru: '',
    file: ''
  });
  const handleCheckboxChange = (section, key, e) => {
    const checked = e.target.checked;
    setFormData(prev => {
      const updatedSection = {
        ...prev[section],
        [key]: checked,
      };


      const kodCount = section === 'kodFiyatlandirma'
        ? Object.values(updatedSection).filter(Boolean).length
        : Object.values(prev.kodFiyatlandirma).filter(Boolean).length;

      const ekstraCount = section === 'ekstraOzellikler'
        ? Object.values(updatedSection).filter(Boolean).length
        : Object.values(prev.ekstraOzellikler).filter(Boolean).length;

      const totalSelected = kodCount + ekstraCount;

      return {
        ...prev,
        [section]: updatedSection,

      };
    });
  };


  const resetForm = () => {
    setFormData({
      sure:'',
      description: '',
      fiyat: '',
      kodFiyatlandirma: {
        logo: false,
        kaynakKod: false,
        fonMuzigi: false
      },
      ekstraOzellikler: {
        hizliTeslimat: false,
        fullHd: false,
      },
      revizyon: '',
      title: 'Ben,',
      hizmetTuru: '',
      file: ''
    });
    setSelectedCategory('');
    setSelectedSubcategory('');
    setStep(1);
    setIsOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();


    const kodSelectedCount = Object.values(formData.kodFiyatlandirma).filter(Boolean).length;
    const ekstraSelectedCount = Object.values(formData.ekstraOzellikler).filter(Boolean).length;
    const totalCheckboxCount = kodSelectedCount + ekstraSelectedCount;
    const fiyatNum = Number(formData.fiyat) || 0;
    const toplamFiyat = fiyatNum + totalCheckboxCount * 100;
    const payload = {
      sure:formData.sure,
      kodFiyatlandirma: formData.kodFiyatlandirma,
      ekstraOzellikler: formData.ekstraOzellikler,
      hizmetTuru: formData.hizmetTuru,
      revizyon: formData.revizyon,
      title: formData.title,
      description: formData.description,
      file: formData.file,
      selectedCategory,
      selectedSubcategory,
      fiyat: toplamFiyat,
      userId: userId,
      kullaniciAd:userid?.result?.firstName
    };

    if (
      (payload.sure === '' || payload.title === '' || payload.hizmetTuru === '' || payload.revizyon === '' || payload.description === '' || payload.file === '') ||
      Number(payload.fiyat) < 100
    ) {
      alert('Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!');
      return;
    }

    await createWorkPost(payload);
    setIsOpen(false)
    resetForm();
  };

  const iconMap = {
    'Grafik & Tasarım': <img src='images/graphic-designer.png' width="50" height="50" />,
    'Yazı & Çeviri': <img src='images/ab.png' width="50" height="50" />,
    'Yazılım & Teknoloji': <img src='images/software.png' width="50" height="50" />,
  };

  return (
    <>

      <button
        className="bg-purple-500 float-right text-white p-4 rounded-md mb-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Yeni İş İlanı Ekle
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-md space-y-6 max-h-[90vh] overflow-y-auto">

            {step === 1 && (
                <>
                <h2 className="text-xl font-semibold text-gray-400">Kategori Seçin</h2>
                <p className='text-gray-400 italic'>Hadi, başlayalım. 😎</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.keys(subcategories).map((cat) => (
                    <div
                      key={cat}
                      className={`cursor-pointer border-2 rounded-lg p-4 text-center ${selectedCategory === cat
                        ? 'border-purple-600 bg-purple-100'
                        : 'border-gray-300'
                        }`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {iconMap[cat]}
                      <p className="mt-2 font-medium text-left text-gray-400">{cat}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    disabled={!selectedCategory}
                    className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                    onClick={() => setStep(2)}
                  >
                    Devam Et
                  </button>
                </div>
              </>
           
            )}


            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold text-gray-400">
                  <span className="text-purple-400">{selectedCategory}</span> kategorisinin alt alanı?
                </h2>
                <p className='text-gray-500 italic'>Biraz daha detay alalım!</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {subcategories[selectedCategory]?.map(sub => (
                    <div
                      key={sub}
                      className={`cursor-pointer border-2 rounded-lg p-4 text-center ${selectedSubcategory === sub ? 'border-purple-600 bg-purple-100' : 'border-gray-300'}`}
                      onClick={() => setSelectedSubcategory(sub)}
                    >
                      <p className="font-medium text-gray-400">{sub}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className="px-6 py-2 text-gray-700 hover:underline"
                    onClick={() => setStep(1)}
                    type="button"
                  >
                    <img src="images/left-arrow.png" width="40" height="40" />
                  </button>
                  <button
                    disabled={!selectedSubcategory}
                    className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                    onClick={() => setStep(3)}
                  >
                    Devam Et
                  </button>
                </div>
              </>
            )}


            {step === 3 && (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-400">Biraz Bahseder misin?</h2>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Başlık</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      const inputValue = e.target.value;

                      if (!inputValue.startsWith("Ben,")) {
                        setFormData({ ...formData, title: "Ben, " + inputValue.replace(/^Ben,? ?/, '') });
                      } else {
                        setFormData({ ...formData, title: inputValue });
                      }
                    }}
                    className="w-full p-3 border-2 border-purple-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Revizyon</label>
                  <input
                    type="number"
                    value={formData.revizyon}
                    onChange={(e) => setFormData({ ...formData, revizyon: e.target.value })}
                    className="w-full p-3 border-2 border-purple-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Süre</label>
                  <input
                    type="text"
                    value={formData.sure}
                    onChange={(e) => setFormData({ ...formData, sure: e.target.value })}
                    className="w-full p-3 border-2 border-purple-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Fiyat</label>
                  <input
                    type="number"
                    value={formData.fiyat}
                    onChange={(e) => setFormData({ ...formData, fiyat: e.target.value })}
                    className="w-full p-3 border-2 border-purple-300 rounded"
                  />
                </div>

                <div>
                  <h3 className="text-md font-semibold text-gray-500">Kod Fiyatlandırma</h3>
                  {['logo', 'kaynakKod', 'fonMuzigi'].map(item => (
                    <label key={item} className="flex items-center space-x-2 mt-2">
                      <input
                        type="checkbox"
                        checked={formData.kodFiyatlandirma[item]}
                        onChange={(e) => handleCheckboxChange('kodFiyatlandirma', item, e)}
                      />
                      <span>{item === 'kaynakKod' ? 'Kaynak Kod' : item === 'fonMuzigi' ? 'Fon Müziği' : 'Logo'}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <h3 className="text-md font-semibold text-gray-500">Ekstra Özellikler</h3>
                  {['hizliTeslimat', 'fullHd'].map(item => (
                    <label key={item} className="flex items-center space-x-2 mt-2">
                      <input
                        type="checkbox"
                        checked={formData.ekstraOzellikler[item]}
                        onChange={(e) => handleCheckboxChange('ekstraOzellikler', item, e)}
                      />
                      <span>{item === 'hizliTeslimat' ? 'Süper Hızlı Teslimat' : 'Full HD (1080px)'}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Hizmet Türü</label>
                  <select
                    value={formData.hizmetTuru}
                    onChange={(e) => setFormData({ ...formData, hizmetTuru: e.target.value })}
                    className="w-full p-3 border-2 border-purple-300 rounded"
                  >
                    <option value="">Seçiniz</option>
                    <option>Admin Panel</option>
                    <option>Özel kodlanmış web tasarımı</option>
                    <option>Hata Giderme</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">İlan Açıklaması</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 border-2 border-purple-300 rounded"
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
                        setFormData({ ...formData, file: reader.result });
                      };
                      if (file) reader.readAsDataURL(file);
                    }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button type="button" onClick={() => setStep(2)}>
                    <img src="images/left-arrow.png" width="40" height="40" />
                  </button>
                  <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
                    Kaydet
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioModal;
