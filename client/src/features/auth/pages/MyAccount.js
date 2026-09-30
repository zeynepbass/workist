import ProfileInfoCard from "../components/ProfileInfoCard";
import ContactSettings from "../components/ContactSettings";
import EditableSkills from "../components/EditableSkills";
import EditableEducation from "../components/EditableEducation";
import { useMyAccount } from "../hooks/useMyAccount";
export default function MyAccount() {
  const { userDetails, updateProfile, isUpdating } = useMyAccount();
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <div className="w-full  space-y-4">
        <ProfileInfoCard
          userDetails={userDetails}
          updateProfile={updateProfile}
          isUpdating={isUpdating}
        />

        <div className="bg-white p-4 rounded-[10px] shadow">
          <ContactSettings
            userDetails={userDetails}
            updateProfile={updateProfile}
            isUpdating={isUpdating}
          />
        </div>

        <div className="bg-white p-4 rounded-[10px] shadow">
          <EditableSkills
            userDetails={userDetails}
            updateProfile={updateProfile}
            isUpdating={isUpdating}
          />
        </div>

        <div className="bg-white p-4 rounded-[10px] shadow">
          <EditableEducation
            userDetails={userDetails}
            updateProfile={updateProfile}
            isUpdating={isUpdating}
          />
        </div>
      </div>
    </div>
  );
}
