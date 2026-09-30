import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { useLogin } from "../../hooks/useAuthActions";
import { loginSchema } from "../../schemas";
import PasswordInput from "../PasswordInput";

const INPUT_CLASS =
  "w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500";

export default function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });

  return (
    <form onSubmit={handleSubmit((values) => login.mutate(values))} className="space-y-5" noValidate>
      <FormField label="E-posta" htmlFor="login-email" error={errors.email?.message}>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="E-posta adresiniz"
          aria-invalid={Boolean(errors.email) || undefined}
          aria-describedby={errors.email ? "login-email-message" : undefined}
          className={INPUT_CLASS}
          {...register("email")}
        />
      </FormField>

      <FormField label="Parola" htmlFor="login-password" error={errors.password?.message}>
        <PasswordInput
          id="login-password"
          autoComplete="current-password"
          placeholder="Parolanız"
          invalid={Boolean(errors.password)}
          {...register("password")}
        />
      </FormField>

      <Button type="submit" variant="primary" disabled={login.isPending} className="w-full py-3">
        {login.isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
      </Button>
    </form>
  );
}
