import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";

const Profile = () => {
  const user=useSelector((store)=>store.user);
  return user&&(
    <div>
      <UserProfile user={user}/>
    </div>
  );
};

export default Profile;
