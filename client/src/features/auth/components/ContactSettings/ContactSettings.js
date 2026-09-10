import { useState, useEffect } from "react";
import { Button } from "@/shared/components/atoms";

export default function ContactSettings({
  userDetails,
  updateDetails,
  isUpdating,
}) {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    tel: "",
  });

  useEffect(() => {
    if (userDetails) {
      setFormData({
        email: userDetails.email || "",
        tel: userDetails.tel || "",
      });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    updateDetails({
      ...userDetails,
      ...formData,
    });

    setEditMode(false);
  };

  return (
    <div className="bg-white p-4 rounded-[10px] shadow">
      <div className="flex justify-between items-center">
        <h6 className="text-left text-gray-600">
          İletişim <strong>Ayarları</strong>
        </h6>

        <Button
          onClick={() => setEditMode(!editMode)}
          className="text-purple-600"
        >
          {editMode ? "İptal" : "Düzenle"}
        </Button>
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

            <Button
              onClick={handleSave}
              disabled={isUpdating}
              className="mt-3 bg-purple-600 text-white px-4 py-1 rounded w-fit"
            >
              {isUpdating ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </>
        ) : (
          <>
            <div>
              <span className="text-gray-400 text-lg">E-posta</span>

              <span className="pl-5 text-lg">{userDetails?.email}</span>
            </div>

            <hr />

            <div>
              <span className="text-gray-400 text-lg">Cep Tel</span>

              <span className="pl-5 text-lg">{userDetails?.tel}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
