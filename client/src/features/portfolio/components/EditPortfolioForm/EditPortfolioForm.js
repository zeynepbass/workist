import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CategoryPicker from "@/features/categories/components/CategoryPicker";
import { Button } from "@/shared/components/atoms";
import { ImageField, validateImage } from "@/shared/components/molecules";
import { useUpdatePortfolio } from "../../hooks/usePortfolios";
import { portfolioFormSchema, portfolioToFormValues } from "../../schemas";
import PortfolioFormFields from "../PortfolioFormFields";

export default function EditPortfolioForm({ portfolio, onSaved }) {
  const [selection, setSelection] = useState({
    category: portfolio.category,
    subcategory: portfolio.subcategory,
  });
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const updatePortfolio = useUpdatePortfolio(portfolio.id);
  const form = useForm({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: portfolioToFormValues(portfolio),
  });

  const submit = form.handleSubmit((values) =>
    updatePortfolio.mutate({ fields: { ...values, ...selection }, image }, { onSuccess: onSaved }),
  );

  return (
    <form
      onSubmit={submit}
      className="space-y-8 rounded-xl border bg-white p-6 shadow-sm"
      noValidate
    >
      <CategoryPicker {...selection} onChange={setSelection} />
      <PortfolioFormFields form={form} idPrefix="edit-portfolio" />
      <ImageField
        id="edit-portfolio-image"
        label="Portfolyo görseli"
        file={image}
        currentUrl={portfolio.imageUrl}
        error={imageError}
        onChange={(file) => {
          setImage(file);
          setImageError(validateImage(file));
        }}
      />
      <div className="flex justify-center">
        <Button
          type="submit"
          variant="primary"
          className="w-full px-8 py-3 sm:w-auto"
          disabled={updatePortfolio.isPending || !selection.subcategory || Boolean(imageError)}
        >
          {updatePortfolio.isPending ? "Güncelleniyor..." : "Portfolyoyu Güncelle"}
        </Button>
      </div>
    </form>
  );
}
