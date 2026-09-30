import { useId, useState } from "react";

import { Button, Input } from "@/shared/components/atoms";

export default function TagListEditor({ title, values, limit, placeholder, onSave, isSaving }) {
  const inputId = useId();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(values);
  const [newValue, setNewValue] = useState("");

  const startEditing = () => {
    setDraft(values);
    setNewValue("");
    setEditing(true);
  };

  const addValue = () => {
    const value = newValue.trim();

    if (value && !draft.includes(value) && draft.length < limit) {
      setDraft((current) => [...current, value]);
      setNewValue("");
    }
  };

  const save = () => {
    onSave(draft);
    setEditing(false);
  };

  return (
    <section className="rounded-[10px] bg-white p-4 shadow" aria-label={title}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-gray-600">{title}</h2>
        <Button className="text-purple-600" onClick={editing ? () => setEditing(false) : startEditing}>
          {editing ? "İptal" : "Düzenle"}
        </Button>
      </div>

      <ul className="flex flex-wrap gap-2">
        {(editing ? draft : values).map((value) => (
          <li key={value} className="flex items-center gap-1 rounded border border-purple-300 px-2 py-1 text-purple-700">
            {value}
            {editing && (
              <button
                type="button"
                aria-label={`${value} kaldır`}
                className="text-red-500"
                onClick={() => setDraft((current) => current.filter((item) => item !== value))}
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>

      {editing && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <label htmlFor={inputId} className="sr-only">
              {placeholder}
            </label>
            <Input
              id={inputId}
              value={newValue}
              placeholder={placeholder}
              onChange={(event) => setNewValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addValue();
                }
              }}
              className="rounded border border-gray-300 px-2 py-1 text-sm"
            />
            <Button variant="primary" className="px-3 py-1 text-sm" onClick={addValue} disabled={draft.length >= limit}>
              Ekle
            </Button>
            <span className="text-xs italic text-gray-400">
              {draft.length}/{limit}
            </span>
          </div>
          <Button variant="primary" className="px-4 py-2 text-sm" onClick={save} disabled={isSaving}>
            {isSaving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      )}
    </section>
  );
}
