import { Input, Select, Textarea } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { SERVICE_TYPE_OPTIONS, totalPrice } from "../../schemas";
import AdOptionsFields from "../AdOptionsFields";

const INPUT_CLASS = "w-full rounded border-2 border-purple-300 p-2";

const TEXT_FIELDS = [
  { name: "title", label: "Başlık", type: "text" },
  { name: "deliveryTime", label: "Teslim süresi", type: "text", placeholder: "Örn. 3 gün" },
  { name: "revisionCount", label: "Revizyon hakkı", type: "number" },
];

const describedBy = (errors, id, name) => (errors[name] ? `${id}-${name}-message` : undefined);

export default function AdFormFields({ form, idPrefix }) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-5">
      <FormField
        label="Hizmet türü"
        htmlFor={`${idPrefix}-serviceType`}
        error={errors.serviceType?.message}
      >
        <Select
          id={`${idPrefix}-serviceType`}
          options={SERVICE_TYPE_OPTIONS}
          placeholder="Hizmet türü seçin"
          aria-describedby={describedBy(errors, idPrefix, "serviceType")}
          {...register("serviceType")}
        />
      </FormField>

      {TEXT_FIELDS.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          htmlFor={`${idPrefix}-${field.name}`}
          error={errors[field.name]?.message}
        >
          <Input
            id={`${idPrefix}-${field.name}`}
            type={field.type}
            placeholder={field.placeholder}
            aria-invalid={Boolean(errors[field.name]) || undefined}
            aria-describedby={describedBy(errors, idPrefix, field.name)}
            className={INPUT_CLASS}
            {...register(field.name)}
          />
        </FormField>
      ))}

      <AdOptionsFields register={register} />

      <FormField
        label="Temel fiyat (TL)"
        htmlFor={`${idPrefix}-basePrice`}
        error={errors.basePrice?.message}
        hint={`Seçimlerle birlikte toplam: ${totalPrice(watch())} TL`}
      >
        <Input
          id={`${idPrefix}-basePrice`}
          type="number"
          min={100}
          aria-invalid={Boolean(errors.basePrice) || undefined}
          aria-describedby={`${idPrefix}-basePrice-message`}
          className={INPUT_CLASS}
          {...register("basePrice")}
        />
      </FormField>

      <FormField
        label="Açıklama"
        htmlFor={`${idPrefix}-description`}
        error={errors.description?.message}
      >
        <Textarea
          id={`${idPrefix}-description`}
          rows={5}
          aria-invalid={Boolean(errors.description) || undefined}
          aria-describedby={describedBy(errors, idPrefix, "description")}
          className={INPUT_CLASS}
          {...register("description")}
        />
      </FormField>
    </div>
  );
}
