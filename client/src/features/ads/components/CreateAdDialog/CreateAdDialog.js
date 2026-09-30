import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CategoryPicker from "@/features/categories/components/CategoryPicker";
import { Button } from "@/shared/components/atoms";
import { ImageField, validateImage } from "@/shared/components/molecules";
import { Dialog } from "@/shared/components/organisms";
import { useCreateAd } from "../../hooks/useAds";
import { EMPTY_AD_FORM, adFormSchema, formValuesToFields } from "../../schemas";
import AdFormFields from "../AdFormFields";

const EMPTY_SELECTION = { category: "", subcategory: "" };

export default function CreateAdDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState(EMPTY_SELECTION);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const createAd = useCreateAd();
  const form = useForm({ resolver: zodResolver(adFormSchema), defaultValues: EMPTY_AD_FORM });

  const close = () => {
    setOpen(false);
    setStep(1);
    setSelection(EMPTY_SELECTION);
    setImage(null);
    setImageError(null);
    form.reset(EMPTY_AD_FORM);
  };

  const submit = form.handleSubmit(async (values) => {
    if (!image) {
      setImageError("İlan görseli zorunludur.");
      return;
    }

    await createAd.mutateAsync({ fields: { ...formValuesToFields(values), ...selection }, image });
    close();
  });

  return (
    <>
      <Button variant="primary" className="mb-4 w-full p-3 md:w-44 md:p-2" onClick={() => setOpen(true)}>
        Yeni İş İlanı Ekle
      </Button>

      <Dialog open={open} onClose={close} title={step === 1 ? "Kategori seçin" : "İlan detayları"}>
        {step === 1 ? (
          <div className="space-y-6">
            <CategoryPicker {...selection} onChange={setSelection} />
            <div className="flex justify-end">
              <Button variant="primary" className="px-6 py-2" disabled={!selection.subcategory} onClick={() => setStep(2)}>
                Devam Et
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-6" noValidate>
            <AdFormFields form={form} idPrefix="create-ad" />
            <ImageField
              id="create-ad-image"
              label="İlan görseli"
              file={image}
              error={imageError}
              onChange={(file) => {
                setImage(file);
                setImageError(validateImage(file));
              }}
            />
            <div className="flex justify-between">
              <Button variant="secondary" className="px-4 py-2" onClick={() => setStep(1)}>
                Geri
              </Button>
              <Button type="submit" variant="primary" className="px-6 py-2" disabled={createAd.isPending || Boolean(imageError)}>
                {createAd.isPending ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </div>
          </form>
        )}
      </Dialog>
    </>
  );
}
