import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { useUpdateProfile } from "../../hooks/useProfile";
import { contactSchema } from "../../schemas";

export default function ContactSettings({ user }) {
  const [editing, setEditing] = useState(false);
  const updateProfile = useUpdateProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema), values: { phone: user.phone } });

  const submit = handleSubmit((values) =>
    updateProfile.mutate(values, { onSuccess: () => setEditing(false) }),
  );

  return (
    <section className="rounded-[10px] bg-white p-4 shadow" aria-label="İletişim ayarları">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-600">
          İletişim <strong>Ayarları</strong>
        </h2>
        <Button className="text-purple-600" onClick={() => setEditing((current) => !current)}>
          {editing ? "İptal" : "Düzenle"}
        </Button>
      </div>

      <dl className="mt-4 space-y-2 text-gray-600">
        <div>
          <dt className="text-sm text-gray-400">E-posta</dt>
          <dd>{user.email}</dd>
        </div>
        {!editing && (
          <div>
            <dt className="text-sm text-gray-400">Cep Tel</dt>
            <dd>{user.phone || "Eklenmedi"}</dd>
          </div>
        )}
      </dl>

      {editing && (
        <form onSubmit={submit} className="mt-3 space-y-3" noValidate>
          <FormField label="Cep Tel" htmlFor="contact-phone" error={errors.phone?.message}>
            <Input id="contact-phone" type="tel" className="w-full rounded border p-2" {...register("phone")} />
          </FormField>
          <Button type="submit" variant="primary" className="px-4 py-1" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </form>
      )}
    </section>
  );
}
