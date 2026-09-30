import { useEffect, useState } from "react";

export const IMAGE_ACCEPT = "image/png,image/jpeg,image/webp";
export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export function validateImage(file) {
  if (!file) return null;
  if (!IMAGE_ACCEPT.split(",").includes(file.type)) return "Yalnızca JPG, PNG veya WEBP yükleyebilirsiniz.";
  if (file.size > IMAGE_MAX_BYTES) return "Görsel en fazla 5 MB olabilir.";
  return null;
}

export function ImageField({ id, label, file, currentUrl, onChange, error }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return undefined;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const shownUrl = previewUrl ?? currentUrl;

  return (
    <div className="space-y-3">
      <label htmlFor={id} className="block font-semibold text-gray-700">
        {label}
      </label>
      {shownUrl && (
        <img src={shownUrl} alt="Seçilen görsel önizlemesi" className="h-40 w-40 rounded border-2 border-dashed object-cover" />
      )}
      <input
        id={id}
        type="file"
        accept={IMAGE_ACCEPT}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={`${id}-message`}
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        className="block text-gray-800 file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-purple-600 file:px-4 file:py-2 file:text-white"
      />
      <p id={`${id}-message`} role={error ? "alert" : undefined} className={`text-sm ${error ? "text-red-600" : "text-gray-500"}`}>
        {error ?? "JPG, PNG veya WEBP, en fazla 5 MB."}
      </p>
    </div>
  );
}
