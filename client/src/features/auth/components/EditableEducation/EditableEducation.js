import { useState, useEffect } from "react";
import { Button } from "@/shared/components/atoms";

export default function EditableEducation({
  userDetails,
  updateDetails,
  isUpdating,
}) {
  const [editMode, setEditMode] = useState(false);
  const [sertifikalar, setSertifikalar] = useState([]);
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    if (userDetails?.sertifika) {
      setSertifikalar(userDetails.sertifika);
    }
  }, [userDetails]);

  const handleAdd = () => {
    if (newValue.trim() !== "" && sertifikalar.length < 5) {
      const updatedList = [...sertifikalar, newValue.trim()];

      setSertifikalar(updatedList);
      setNewValue("");
    }
  };

  const handleDelete = (index) => {
    const updatedList = sertifikalar.filter((_, i) => i !== index);

    setSertifikalar(updatedList);
  };

  const handleSave = () => {
    updateDetails({
      ...userDetails,
      sertifika: sertifikalar,
    });

    setEditMode(false);
  };

  return (
    <div className="bg-white p-4 rounded-[10px] shadow">
      <div className="flex justify-between items-center mb-4">
        <h6 className="text-gray-600 mb-2">Eğitim ve Sertifika Bilgileri</h6>

        <Button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center bg-transparent text-gray-400 px-3 py-1 rounded hover:bg-purple-700 hover:text-white"
          title="Ekle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>

          {editMode ? "İptal" : "Düzenle"}
        </Button>
      </div>

      {editMode && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Yeni eğitim / sertifika giriniz"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full border px-3 py-1 rounded text-sm"
          />

          <Button
            onClick={handleAdd}
            disabled={sertifikalar.length >= 5}
            className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
          >
            Ekle
          </Button>
        </div>
      )}

      <ul>
        {sertifikalar?.map((item, index) => (
          <li
            key={index}
            className="m-1 flex justify-between items-center border border-gray-300 rounded px-3 py-1 mb-2"
          >
            <span>{item}</span>

            {editMode && (
              <Button
                onClick={() => handleDelete(index)}
                title="Sil"
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            )}
          </li>
        ))}
      </ul>

      {editMode && (
        <Button
          onClick={handleSave}
          disabled={isUpdating}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded text-sm"
        >
          {isUpdating ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      )}
    </div>
  );
}
