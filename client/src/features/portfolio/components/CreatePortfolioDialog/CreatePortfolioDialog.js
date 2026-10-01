import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CategoryPicker from "@/features/categories/components/CategoryPicker";
import { Button } from "@/shared/components/atoms";
import { ImageField, validateImage } from "@/shared/components/molecules";
import { Dialog } from "@/shared/components/organisms";
import { useCreatePortfolio } from "../../hooks/usePortfolios";
import { EMPTY_PORTFOLIO_FORM, portfolioFormSchema } from "../../schemas";
import PortfolioFormFields from "../PortfolioFormFields";

const EMPTY_SELECTION = { category: "", subcategory: "" };

export default function CreatePortfolioDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState(EMPTY_SELECTION);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const createPortfolio = useCreatePortfolio();
  const form = useForm({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: EMPTY_PORTFOLIO_FORM,
  });

  const close = () => {
    setOpen(false);
    setStep(1);
    setSelection(EMPTY_SELECTION);
    setImage(null);
    setImageError(null);
    form.reset(EMPTY_PORTFOLIO_FORM);
  };

  const submit = form.handleSubmit(async (values) => {
    if (!image) {
      setImageError("Portfolyo görseli zorunludur.");
      return;
    }

    await createPortfolio.mutateAsync({ fields: { ...values, ...selection }, image });
    close();
  });

  return (
    <>
      <Button
        variant="primary"
        className="mb-4 w-full p-3 md:w-44 md:p-2"
        onClick={() => setOpen(true)}
      >
        Yeni Portfolyo Ekle
      </Button>
      <Dialog
        open={open}
        onClose={close}
        title={step === 1 ? "Kategori seçin" : "Portfolyo detayları"}
      >
        {step === 1 ? (
          <div className="space-y-6">
            <CategoryPicker {...selection} onChange={setSelection} />
            <div className="flex justify-end">
              <Button
                variant="primary"
                className="px-6 py-2"
                disabled={!selection.subcategory}
                onClick={() => setStep(2)}
              >
                Devam Et
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-6" noValidate>
            <PortfolioFormFields form={form} idPrefix="create-portfolio" />
            <ImageField
              id="create-portfolio-image"
              label="Portfolyo görseli"
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
              <Button
                type="submit"
                variant="primary"
                className="px-6 py-2"
                disabled={createPortfolio.isPending || Boolean(imageError)}
              >
                Kaydet
              </Button>
            </div>
          </form>
        )}
      </Dialog>
    </>
  );
}
