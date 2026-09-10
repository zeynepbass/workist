import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaFileImage } from "react-icons/fa";
import { PortfolioContext } from "../../../../Context/workContext";
import { Textarea,Button,Input,Select } from "@/shared/components/atoms";
const PortfolioForm = () => {
  const { id } = useParams();
  const { detailsPortfolyo, detail, fetchUpdated, userId } =
    useContext(PortfolioContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    durum: "",
    fiyat: "",
    description: "",
    file: "",
    currency: "TL",
    selectedCategory: "",
    userId: userId,
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
        title: detail.title || "",
        durum: detail.durum || "",
        fiyat: detail.fiyat || "",
        description: detail.description || "",
        file: detail.file || "",
        currency: detail.currency || "TL",
        selectedCategory: detail.selectedCategory || "",
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
      formData.title === "" ||
      formData.durum === "" ||
      formData.description === "" ||
      formData.file === "" ||
      Number(formData.fiyat) < 100
    ) {
      alert("Tüm alanları doldurun ve fiyat en az 100 TL olmalıdır!");
      return;
    }
    fetchUpdated(id, formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="max-w-8xl mx-auto space-y-6 h-auto px-[150px]">
               
                                  <Button
                             onClick={handleBack}
                             className="flex items-center text-purple-600 hover:text-purple-800 py-5"
                           >
                             <FaArrowLeft className="mr-2" />
                             Geri Dön
          
                                  </Button>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
  label="            Kategori Seçimi"
  name="selectedCategory"
  value={formData.selectedCategory}
  onChange={handleChange}
  className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"

    options={[
      {
        value: "Grafik & Tasarım",
        label: "Grafik & Tasarım",
      },
      {
        value: "Yazı & Çeviri",
        label: "Yazı & Çeviri",
      },
      {
        value: "Yazılım & Teknoloji",
        label: "Yazılım & Teknoloji",
      }
    ]}
    placeholder={null}
/>




            <div>

              <Input
                            label="    Başlığınızla ziyaretçiyi etkile*"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Portfolyonuz için başlık girin"
                className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
              />
            </div>

            <div>

              <Input
              label="             Durum*"
                type="text"
                name="durum"
                value={formData.durum}
                onChange={handleChange}
                placeholder="Portfolyonuz için durum girin"
                className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
              />
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-full">

                <Input
                            label="               Fiyat*"
                  type="number"
                  name="fiyat"
                  value={formData.fiyat}
                  onChange={handleChange}
                  placeholder="Portfolyonuz için fiyat girin"
                  className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
                />
              </div>
              <div className="pt-7">
              <Select
               name="currency"
               value={formData.currency}
               onChange={handleChange}
               className="p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
           
    options={[
      {
        value: "TL",
        label: "TL",
      },
      {
        value: "USD",
        label: "USD",
      },
    ]}
    placeholder={null}
 />

              </div>
            </div>
          </div>
          <div>
            <Textarea
              label="                   Portfolyonuzu Detaillıca Açıklayın*"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Detaillı açıklama girin"
              className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
            />
          </div>

          {formData.file && (
            <div className="justify-center flex">
              <img
                src={formData.file}
                width="400"
                height="400"
                className="border-2 border-dashed"
              />
            </div>
          )}

          <div className="border-2 border-dashed border-purple-300 p-4 rounded bg-gray-100 flex justify-center">
            <div className="py-5">
   
              <div className="flex justify-center">
                <Input
                label="        Dosya Seç"
                  type="file"
                  onChange={handleFileChange}
                  className="text-gray-800 file:bg-purple-600 file:text-white file:rounded file:px-4 file:py-2 file:border-0 file:cursor-pointer"
                  accept="image/png, image/jpeg"
                />
              </div>

              <div className="py-3 flex items-center justify-center">
                <span className="text-sm text-gray-500">
                  JPG, PNG dosyalarını yükleyebilirsin
                </span>
                <FaFileImage className="text-gray-400 text-2xl pl-3" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-5">
        <Button
                 type="submit"
                 className=" mt-4 bg-gray-800 text-white rounded hover:bg-gray-700 px-10 py-3"
               >
                 Güncelle
                                  </Button>

        </div>
      </form>
    </>
  );
};

export default PortfolioForm;
