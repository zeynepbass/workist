import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { useRegister } from "../../hooks/useAuthActions";
import { registerSchema } from "../../schemas";
import PasswordInput from "../PasswordInput";

const INPUT_CLASS =
  "w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500";

const TEXT_FIELDS = [
  { name: "firstName", label: "Adı", autoComplete: "given-name", type: "text" },
  { name: "lastName", label: "Soyadı", autoComplete: "family-name", type: "text" },
  { name: "email", label: "E-posta", autoComplete: "email", type: "email" },
];

const PASSWORD_FIELDS = [
  { name: "password", label: "Parola" },
  { name: "confirmPassword", label: "Parola Tekrar" },
];

export default function RegisterForm() {
  const registration = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => registration.mutate(values))}
      className="space-y-5"
      noValidate
    >
      {TEXT_FIELDS.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          htmlFor={`register-${field.name}`}
          error={errors[field.name]?.message}
        >
          <Input
            id={`register-${field.name}`}
            type={field.type}
            autoComplete={field.autoComplete}
            aria-invalid={Boolean(errors[field.name]) || undefined}
            aria-describedby={errors[field.name] ? `register-${field.name}-message` : undefined}
            className={INPUT_CLASS}
            {...register(field.name)}
          />
        </FormField>
      ))}

      {PASSWORD_FIELDS.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          htmlFor={`register-${field.name}`}
          error={errors[field.name]?.message}
        >
          <PasswordInput
            id={`register-${field.name}`}
            autoComplete="new-password"
            invalid={Boolean(errors[field.name])}
            {...register(field.name)}
          />
        </FormField>
      ))}

      <Button
        type="submit"
        variant="primary"
        disabled={registration.isPending}
        className="w-full py-3"
      >
        {registration.isPending ? "Kayıt yapılıyor..." : "Kayıt Ol"}
      </Button>
    </form>
  );
}
