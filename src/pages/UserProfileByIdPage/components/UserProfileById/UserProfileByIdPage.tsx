import UserProfileById from "@modules/UserProfileById";
import { useParams } from "react-router-dom";

const UserProfileByIdPage = () => {
  const { id } = useParams();

  return (
    <>
      <UserProfileById userId={Number(id)} />
    </>
  );
};

export default UserProfileByIdPage;
