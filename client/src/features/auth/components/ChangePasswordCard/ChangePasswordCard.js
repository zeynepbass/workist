import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { useChangePassword } from "../../hooks/useProfile";
import { changePasswordSchema } from "../../schemas";
import PasswordInput from "../PasswordInput";

export default function ChangePasswordCard() {
  const changePassword = useChangePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  return (
    <section className="rounded-[10px] bg-white p-4 shadow" aria-label="Parola değiştir">
      <h2 className="mb-3 text-gray-600">Parola Değiştir</h2>
      <form onSubmit={handleSubmit((values) => changePassword.mutate(values))} className="space-y-3" noValidate>
        <FormField label="Mevcut parola" htmlFor="current-password" error={errors.currentPassword?.message}>
          <PasswordInput id="current-password" autoComplete="current-password" invalid={Boolean(errors.currentPassword)} {...register("currentPassword")} />
        </FormField>
        <FormField label="Yeni parola" htmlFor="new-password" error={errors.newPassword?.message}>
          <PasswordInput id="new-password" autoComplete="new-password" invalid={Boolean(errors.newPassword)} {...register("newPassword")} />
        </FormField>
        <Button type="submit" variant="primary" className="px-4 py-2" disabled={changePassword.isPending}>
          Parolayı Değiştir
        </Button>
      </form>
    </section>
  );
}
