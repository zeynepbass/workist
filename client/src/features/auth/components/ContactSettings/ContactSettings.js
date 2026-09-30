import { useState, useEffect } from "react";
import { Button, Input } from "@/shared/components/atoms";

export default function ContactSettings({ userDetails, updateProfile, isUpdating }) {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (userDetails) {
      setFormData({
        email: userDetails.email || "",
        phone: userDetails.phone || "",
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
    updateProfile({
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

        <Button onClick={() => setEditMode(!editMode)} className="text-purple-600">
          {editMode ? "İptal" : "Düzenle"}
        </Button>
      </div>

      <div className="mt-4 space-y-2 text-gray-600">
        {editMode ? (
          <>
            <div className="flex flex-col">
              <label htmlFor="contact-email" className="text-gray-400 text-sm">
                E-posta
              </label>

              <Input
                id="contact-email"
                type="email"
                className="border p-2 rounded"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <hr />

            <div className="flex flex-col">
              <label htmlFor="contact-phone" className="text-gray-400 text-sm">
                Cep Tel
              </label>

              <Input
                id="contact-phone"
                type="text"
                className="border p-2 rounded"
                name="phone"
                value={formData.phone}
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

              <span className="pl-5 text-lg">{userDetails?.phone}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
