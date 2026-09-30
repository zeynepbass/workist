import { StatusMessage } from "@/shared/components/molecules";
import ChangePasswordCard from "../components/ChangePasswordCard";
import ContactSettings from "../components/ContactSettings";
import DeleteAccountCard from "../components/DeleteAccountCard";
import ProfileInfoCard from "../components/ProfileInfoCard";
import TagListEditor from "../components/TagListEditor";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useUpdateProfile } from "../hooks/useProfile";
import { CERTIFICATE_LIMIT, SKILL_LIMIT } from "../schemas";

export default function MyAccount() {
  const { user, isLoading } = useCurrentUser();
  const updateProfile = useUpdateProfile();

  if (isLoading || !user) {
    return <StatusMessage type="loading" message="Hesap bilgileri yükleniyor..." />;
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl text-gray-600">Hesabım</h1>
      <ProfileInfoCard user={user} />
      <ContactSettings user={user} />
      <TagListEditor
        title="Uzmanı Olduğu Alanlar & Araçlar"
        values={user.skills}
        limit={SKILL_LIMIT}
        placeholder="Yeni alan ekle"
        isSaving={updateProfile.isPending}
        onSave={(skills) => updateProfile.mutate({ skills })}
      />
      <TagListEditor
        title="Eğitim ve Sertifika Bilgileri"
        values={user.certificates}
        limit={CERTIFICATE_LIMIT}
        placeholder="Yeni eğitim / sertifika"
        isSaving={updateProfile.isPending}
        onSave={(certificates) => updateProfile.mutate({ certificates })}
      />
      <ChangePasswordCard />
      <DeleteAccountCard />
    </div>
  );
}
