import { useId, useState } from "react";

import { Button, Textarea } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { DELIVERY_MAX_BYTES, DELIVERY_MAX_FILES } from "../../schemas";

const ACCEPT = "image/png,image/jpeg,image/webp,application/pdf,application/zip";

function validateFiles(files) {
  if (files.length > DELIVERY_MAX_FILES)
    return `En fazla ${DELIVERY_MAX_FILES} dosya yükleyebilirsiniz.`;
  if (files.some((file) => file.size > DELIVERY_MAX_BYTES))
    return "Her dosya en fazla 20 MB olabilir.";
  return null;
}

export default function DeliverForm({ onSubmit, isSubmitting }) {
  const fileInputId = useId();
  const [note, setNote] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const submit = (event) => {
    event.preventDefault();

    if (!note.trim() && files.length === 0) {
      setError("Teslimat için not veya dosya ekleyin.");
      return;
    }

    onSubmit({ note: note.trim(), files });
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <FormField label="Teslimat notu" htmlFor="delivery-note">
        <Textarea
          id="delivery-note"
          rows={4}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="w-full rounded border-2 border-purple-300 p-2"
        />
      </FormField>
      <FormField
        label="Dosyalar"
        htmlFor={fileInputId}
        error={error}
        hint="PDF, ZIP veya görsel; en fazla 5 dosya, her biri 20 MB."
      >
        <input
          id={fileInputId}
          type="file"
          multiple
          accept={ACCEPT}
          onChange={(event) => {
            const selected = [...(event.target.files ?? [])];
            setFiles(selected);
            setError(validateFiles(selected));
          }}
        />
      </FormField>
      <Button
        type="submit"
        variant="primary"
        className="w-full py-2"
        disabled={isSubmitting || Boolean(error && files.length)}
      >
        {isSubmitting ? "Gönderiliyor..." : "Teslim Et"}
      </Button>
    </form>
  );
}
