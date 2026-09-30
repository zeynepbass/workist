import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/atoms";
import { ImageField, validateImage } from "@/shared/components/molecules";
import { useUpdateAd } from "../../hooks/useAds";
import { adFormSchema, adToFormValues, formValuesToFields } from "../../schemas";
import AdFormFields from "../AdFormFields";

export default function EditAdForm({ ad, onSaved }) {
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const updateAd = useUpdateAd(ad.id);
  const form = useForm({ resolver: zodResolver(adFormSchema), defaultValues: adToFormValues(ad) });

  const submit = form.handleSubmit((values) =>
    updateAd.mutate({ fields: formValuesToFields(values), image }, { onSuccess: onSaved }),
  );

  return (
    <form onSubmit={submit} className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" noValidate>
      <AdFormFields form={form} idPrefix="edit-ad" />
      <ImageField
        id="edit-ad-image"
        label="İlan görseli"
        file={image}
        currentUrl={ad.imageUrl}
        error={imageError}
        onChange={(file) => {
          setImage(file);
          setImageError(validateImage(file));
        }}
      />
      <div className="flex justify-center">
        <Button type="submit" variant="primary" className="w-full px-10 py-3 sm:w-auto" disabled={updateAd.isPending || Boolean(imageError)}>
          {updateAd.isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </Button>
      </div>
    </form>
  );
}
