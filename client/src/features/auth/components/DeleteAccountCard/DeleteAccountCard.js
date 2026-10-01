import { useState } from "react";

import { Button } from "@/shared/components/atoms";
import { FormField } from "@/shared/components/molecules";
import { Dialog } from "@/shared/components/organisms";
import { useDeleteAccount } from "../../hooks/useProfile";
import PasswordInput from "../PasswordInput";

export default function DeleteAccountCard() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const deleteAccount = useDeleteAccount();

  return (
    <section
      className="flex items-center justify-between rounded-[10px] bg-white p-4 shadow"
      aria-label="Hesap yönetimi"
    >
      <h2 className="text-gray-600">
        Hesap <strong>Yönetimi</strong>
      </h2>
      <Button variant="danger" className="px-3 py-2" onClick={() => setOpen(true)}>
        Hesabı Sil
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} title="Hesabı sil" size="md">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            deleteAccount.mutate(password);
          }}
        >
          <p className="text-sm text-gray-600">
            Hesabınız, ilanlarınız, portfolyolarınız ve mesajlarınız kalıcı olarak silinir.
            Onaylamak için parolanızı girin.
          </p>
          <FormField label="Parola" htmlFor="delete-account-password">
            <PasswordInput
              id="delete-account-password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormField>
          <Button
            type="submit"
            variant="danger"
            className="w-full py-2"
            disabled={!password || deleteAccount.isPending}
          >
            {deleteAccount.isPending ? "Siliniyor..." : "Hesabımı kalıcı olarak sil"}
          </Button>
        </form>
      </Dialog>
    </section>
  );
}
