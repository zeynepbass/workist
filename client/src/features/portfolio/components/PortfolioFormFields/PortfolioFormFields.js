import { Input, Select, Textarea } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { PORTFOLIO_STATUS_OPTIONS } from "../../schemas";

const INPUT_CLASS = "w-full rounded border-2 border-purple-300 p-2";

export default function PortfolioFormFields({ form, idPrefix }) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      <FormField label="Başlık" htmlFor={`${idPrefix}-title`} error={errors.title?.message}>
        <Input id={`${idPrefix}-title`} className={INPUT_CLASS} {...register("title")} />
      </FormField>
      <FormField
        label="Açıklama"
        htmlFor={`${idPrefix}-description`}
        error={errors.description?.message}
      >
        <Textarea
          id={`${idPrefix}-description`}
          rows={4}
          className={INPUT_CLASS}
          {...register("description")}
        />
      </FormField>
      <FormField label="Fiyat (TL)" htmlFor={`${idPrefix}-price`} error={errors.price?.message}>
        <Input
          id={`${idPrefix}-price`}
          type="number"
          min={100}
          className={INPUT_CLASS}
          {...register("price")}
        />
      </FormField>
      <FormField label="Yayın durumu" htmlFor={`${idPrefix}-status`}>
        <Select
          id={`${idPrefix}-status`}
          options={PORTFOLIO_STATUS_OPTIONS}
          placeholder={null}
          {...register("status")}
        />
      </FormField>
    </div>
  );
}
