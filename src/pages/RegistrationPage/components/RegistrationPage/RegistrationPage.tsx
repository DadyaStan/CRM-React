import RegistrationForm from "@modules/RegistrationForm";
import RegistrationHeading from "../RegistrationHeading";
import BackToLogin from "../BackToLogin";

const RegistrationPage = () => {
  return (
    <>
      <RegistrationHeading />
      <RegistrationForm />
      <BackToLogin />
    </>
  );
};

export default RegistrationPage;
