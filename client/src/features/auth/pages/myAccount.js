
import ProfileInfoCard from "../components/ProfileInfoCard";
import ProfileEmail from "../components/ContactSettings";
import EditableSkills from "../components/EditableSkills";
import EditableEducation from "../components/EditableEducation";
import { useDetails } from "../hooks/useDetails";
export default function Index() {
  const currentUser = JSON.parse(localStorage.getItem("login"));
  const email = currentUser?.result?.email;
  const { userDetails, updateDetails, isUpdating } = useDetails(email);
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <div className="w-full  space-y-4">
        <ProfileInfoCard
          userDetails={userDetails}
          updateDetails={updateDetails}
          isUpdating={isUpdating}
        />

        <div className="bg-white p-4 rounded-[10px] shadow">
          <ProfileEmail
            userDetails={userDetails}
            updateDetails={updateDetails}
            isUpdating={isUpdating}
          />
        </div>

        <div className="bg-white p-4 rounded-[10px] shadow">
          <EditableSkills
            userDetails={userDetails}
            updateDetails={updateDetails}
            isUpdating={isUpdating}
          />
        </div>

        <div className="bg-white p-4 rounded-[10px] shadow">
          <EditableEducation
            userDetails={userDetails}
            updateDetails={updateDetails}
            isUpdating={isUpdating}
          />
        </div>
      </div>
    </div>
  );
}
