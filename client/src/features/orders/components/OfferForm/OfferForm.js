import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, Textarea } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { offerSchema } from "../../schemas";

const INPUT_CLASS = "w-full rounded border-2 border-purple-300 p-2";

export default function OfferForm({ defaultValues, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: { price: 100, deliveryDays: 3, note: "", ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormField label="Fiyat (TL)" htmlFor="offer-price" error={errors.price?.message}>
        <Input id="offer-price" type="number" className={INPUT_CLASS} {...register("price")} />
      </FormField>
      <FormField
        label="Teslim süresi (gün)"
        htmlFor="offer-days"
        error={errors.deliveryDays?.message}
      >
        <Input
          id="offer-days"
          type="number"
          className={INPUT_CLASS}
          {...register("deliveryDays")}
        />
      </FormField>
      <FormField label="Not" htmlFor="offer-note" error={errors.note?.message}>
        <Textarea id="offer-note" rows={3} className={INPUT_CLASS} {...register("note")} />
      </FormField>
      <Button type="submit" variant="primary" className="w-full py-2" disabled={isSubmitting}>
        Teklifi Gönder
      </Button>
    </form>
  );
}
