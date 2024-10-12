import { useParams } from "react-router-dom";
import UnderConstruction from "../components/UnderConstruction.jsx";

const Profile = () => {
  const username = useParams().username;
  return (
    <>
      <div className='font-bold text-[32px] mt-4'>{username}&apos;s profile.</div>
      <UnderConstruction />
    </>
  );
};

export default Profile;
