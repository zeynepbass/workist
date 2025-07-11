import React, { useState, useContext, useEffect } from "react";
import { PortfolioContext } from "../../../../Context/workContext";

const EditableSkills = () => {
  const { email, detailsPost, updatedPost } = useContext(PortfolioContext);

  const [editMode, setEditMode] = useState(false);
  const [skills, setSkills] = useState([]); 
  const [newSkill, setNewSkill] = useState(""); 

  useEffect(() => {
    detailsPost(); 
  }, []);

  useEffect(() => {
    if (email?.uzmanlik) {
      setSkills(email.uzmanlik);
    }
  }, [email]);

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills((prev) => [...prev, newSkill]);
      setNewSkill("");
    }
  };


  const handleRemoveSkill = (indexToRemove) => {
    setSkills((prev) => prev.filter((_, index) => index !== indexToRemove));
  };


  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleSave = () => {
    updatedPost({ ...email, uzmanlik: skills });
    setEditMode(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-3">
        <h6 className="text-left text-gray-600">
          Uzmanı Olduğu Alanlar & <strong>Araçlar</strong>
        </h6>
        <button onClick={() => setEditMode(!editMode)} className="text-purple-600">
          {editMode ? "İptal" : "Düzenle"}
        </button>
      </div>

      <hr className="mb-4" />

      {editMode ? (
        <>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center border border-purple-300 rounded px-2 py-1 text-purple-700">
                <input
                  type="text"
                  className="bg-transparent outline-none text-sm"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                />
                <button onClick={() => handleRemoveSkill(index)} className="ml-1 text-red-500">
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Yeni alan ekle"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <button
              onClick={handleAddSkill}
              disabled={skills.length >= 6}
              className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
            >
              Ekle
            </button>
            <span className="text-xs text-gray-400 italic">
              {skills.length}/6 yetenek eklendi
            </span>
          </div>

          <button
            onClick={handleSave}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded text-sm"
          >
            Kaydet
          </button>
        </>
      ) : (
        <ul className="pl-2 list-none flex flex-wrap pt-2">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="p-2 border border-purple-300 rounded m-1 text-purple-700"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EditableSkills;
