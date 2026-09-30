import { useId } from "react";

import { Avatar } from "@/shared/components/atoms";
import { useUpdateAvatar } from "../../hooks/useProfile";

export default function AvatarUploader({ user }) {
  const inputId = useId();
  const updateAvatar = useUpdateAvatar();

  return (
    <div className="flex items-center gap-4">
      <Avatar user={user} size="lg" />
      <div>
        <label htmlFor={inputId} className="cursor-pointer text-sm font-medium text-purple-600">
          {updateAvatar.isPending ? "Yükleniyor..." : "Fotoğrafı değiştir"}
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          disabled={updateAvatar.isPending}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) updateAvatar.mutate(file);
            event.target.value = "";
          }}
        />
        <p className="text-xs text-gray-400">JPG, PNG veya WEBP, en fazla 5 MB.</p>
      </div>
    </div>
  );
}
