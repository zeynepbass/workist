import React, { useContext, useState, useRef } from 'react';
import { PortfolioContext } from '../../Context/workContext';
const PortfolioModal = () => {
  const { createWork,userId } = useContext(PortfolioContext);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    fiyat: '',
    currency: 'TL',
    title: '',
    description: '',
    file: ''
  });

  const subcategories = {
    'Grafik & Tasarım': ['Logo Tasarımı', 'Afiş Tasarımı', 'Sosyal Medya Postu'],
    'Yazı & Çeviri': ['Makale', 'Blog Yazısı', 'Kitap Çevirisi'],
    'Yazılım & Teknoloji': ['Web Uygulaması', 'Mobil Uygulama', 'API Geliştirme'],
  };




  const iconMap = {
    'Grafik & Tasarım': <img src='images/graphic-designer.png' width="50" height="50" />,
    'Yazı & Çeviri': <img src='images/ab.png' width="50" height="50" />,
    'Yazılım & Teknoloji': <img src='images/software.png' width="50" height="50" />,
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fiyat: formData.fiyat,
      currency: formData.currency,
      title: formData.title,
      description: formData.description,
      file: formData.file,
      selectedCategory,
      selectedSubcategory,
      userId: userId
    };
    if (
      ( payload.file === '' || payload.description === '' || payload.title === '') ||
      Number(payload.fiyat) < 100
    ) {
      alert('Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!');
      return;
    }
   await createWork(payload)
    setIsOpen(false)
    setFormData("")
    setSelectedCategory("")
    setSelectedSubcategory("")
  };


  return (
    <>
<button
  className="bg-purple-500 float-right text-white p-4 rounded-md mb-4 cursor-pointer 
             text-base w-full 
             md:text-sm md:p-2 md:w-40"
  ref={modalRef}
  onClick={() => setIsOpen(true)}
>
  Yeni Portfolyo Ekle
</button>


      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-md space-y-6">

            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold text-gray-400">Kategori Seçin</h2>
                <p className='text-gray-400 italic'>Hadi, başlayalım. 😎 Ekleyeceğin portfolyo hangi ana kategoriye giriyor?</p>
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
                  Peki, ekleyeceğin portfolyo <span className="text-purple-400">{selectedCategory}</span> kategorisinin hangi alanına giriyor?
                </h2>
                <p className='text-gray-500 italic'>Biraz daha detay alalım!</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {subcategories[selectedCategory]?.map((sub) => (
                    <div
                      key={sub}
                      className={`cursor-pointer border-2 rounded-lg p-4 text-center ${selectedSubcategory === sub
                        ? 'border-purple-600 bg-purple-100'
                        : 'border-gray-300'
                        }`}
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
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-400">Biraz Bahseder misin?</h2>
                <p className='text-gray-500 italic'>Harika! Şimdi portfolyonu oluşturmaya başlayabilirsin. 🚀</p>
                <input
                  type="text"
                  placeholder="Etkileyici bir başlık"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border-2 border-purple-500 rounded bg-white text-black"
                />

                <textarea
                  rows={4}
                  placeholder="Portfolyon hakkında detaylı bilgi ver..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border-2 border-purple-500 rounded bg-white text-black"
                ></textarea>
                <div className="flex space-x-2 items-center">
                  <input
                    type="number"
                    placeholder="Fiyat girin"
                    value={formData.fiyat}
                    onChange={(e) => setFormData({ ...formData, fiyat: e.target.value })}
                    className="flex-grow p-3 border-2 border-purple-500 rounded bg-white text-black"
                  />

                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="p-3 border-2 border-purple-500 rounded bg-white text-black cursor-pointer"
                  >
                    <option value="TL">TL</option>
                    <option value="USD">USD</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-purple-300 p-2 rounded bg-gray-50 flex justify-left">
                  <div className='py-2'>
                    <label className="block mb-2 font-semibold text-gray-700 text-left">Dosya Seç</label>
                    <div className="flex justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, file: reader.result });
                          };
                          if (file) {
                            reader.readAsDataURL(file);
                          }
                        }}
                      />


                    </div>


                  </div>

                </div>


                <div className="flex justify-between ">
                  <button
                    className="px-6 py-2 text-gray-700 hover:underline"
                    onClick={() => setStep(2)}
                    type="button"
                  >
                    <img src="images/left-arrow.png" width="40" height="40" />
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
                  >
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
