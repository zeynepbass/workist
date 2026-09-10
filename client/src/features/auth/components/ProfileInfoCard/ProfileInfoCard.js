import { useState, useEffect } from "react";
import { Textarea, Button, Input } from "@/shared/components/atoms";

export default function ProfileInfoCard({
  userDetails,
  updateDetails,
  isUpdating,
}) {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    file: "",
    unvan: "",
    firstName: "",
    lastName: "",
    hakkimda: "",
  });

  useEffect(() => {
    if (userDetails) {
      setFormData({
        file: userDetails.file || "",
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        unvan: userDetails.unvan || "",
        hakkimda: userDetails.hakkimda || "",
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        file: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white p-4 rounded-[10px] shadow">
      <div className="flex justify-end items-center">
        <Button
          onClick={() => setEditMode(!editMode)}
          className="text-purple-600"
        >
          {editMode ? "İptal" : "Düzenle"}
        </Button>
      </div>

      <br />

      {editMode ? (
        <>
          <img
            src={formData.file}
            width="100"
            height="100"
            className="rounded-full shadow-lg"
          />

          <Input
            type="file"
            className="m-5"
            accept="image/*"
            onChange={handleFileChange}
          />

          <Input
            type="text"
            className="border p-2 w-full mb-2"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="adınızı girin"
          />
          <Input
            type="text"
            className="border p-2 w-full mb-2"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="soyadınızı girin"
          />
          <Input
            type="text"
            className="border p-2 w-full mb-2"
            placeholder="ünvanınızı girin"
            name="unvan"
            value={formData.unvan}
            onChange={handleChange}
          />

          <Textarea
            className="border p-2 w-full mb-2"
            rows={4}
            name="hakkimda"
            placeholder="kendinizden bahsedin"
            value={formData.hakkimda}
            onChange={handleChange}
          />

          <Button
            onClick={handleSave}
            disabled={isUpdating}
            className="bg-purple-600 text-white px-4 py-1 rounded"
          >
            {isUpdating ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </>
      ) : (
        <>
          <div>
            <img
              src={userDetails?.file}
              width="100"
              height="100"
              className="rounded-full shadow-lg"
            />
          </div>

          <br />

          <p>
            {userDetails?.firstName} {userDetails?.lastName}
          </p>

          <p className="text-gray-400 italic">{userDetails?.unvan}</p>

          <br />

          <h5 className="text-purple-700">
            <strong>{userDetails?.unvan}</strong>
          </h5>

          <p className="text-sm text-gray-400 pt-2">{userDetails?.hakkimda}</p>
        </>
      )}
    </div>
  );
}
