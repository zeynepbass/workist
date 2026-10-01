import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, Textarea } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { useUpdateProfile } from "../../hooks/useProfile";
import { profileSchema } from "../../schemas";
import AvatarUploader from "./AvatarUploader";

const INPUT_CLASS = "w-full rounded border p-2";

const FIELDS = [
  { name: "firstName", label: "Ad" },
  { name: "lastName", label: "Soyad" },
  { name: "title", label: "Ünvan" },
];

export default function ProfileInfoCard({ user }) {
  const [editing, setEditing] = useState(false);
  const updateProfile = useUpdateProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(profileSchema), values: user });

  const submit = handleSubmit((values) =>
    updateProfile.mutate(values, { onSuccess: () => setEditing(false) }),
  );

  return (
    <section className="space-y-4 rounded-[10px] bg-white p-4 shadow" aria-label="Profil bilgileri">
      <div className="flex items-center justify-between">
        <AvatarUploader user={user} />
        <Button
          className="text-purple-600"
          onClick={() => {
            reset(user);
            setEditing((current) => !current);
          }}
        >
          {editing ? "İptal" : "Düzenle"}
        </Button>
      </div>

      {editing ? (
        <form onSubmit={submit} className="space-y-3" noValidate>
          {FIELDS.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              htmlFor={`profile-${field.name}`}
              error={errors[field.name]?.message}
            >
              <Input
                id={`profile-${field.name}`}
                className={INPUT_CLASS}
                {...register(field.name)}
              />
            </FormField>
          ))}
          <FormField label="Hakkımda" htmlFor="profile-about" error={errors.about?.message}>
            <Textarea id="profile-about" rows={4} className={INPUT_CLASS} {...register("about")} />
          </FormField>
          <Button
            type="submit"
            variant="primary"
            className="px-4 py-1"
            disabled={updateProfile.isPending}
          >
            {updateProfile.isPending ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </form>
      ) : (
        <div>
          <p className="font-medium">{user.fullName}</p>
          <p className="italic text-gray-400">{user.title || "Ünvan eklenmedi."}</p>
          <p className="pt-2 text-sm text-gray-500">{user.about}</p>
        </div>
      )}
    </section>
  );
}
