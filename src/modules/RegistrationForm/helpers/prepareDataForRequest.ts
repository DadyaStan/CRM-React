import type { UserRegistration } from "../types/registration";

interface dataFotRequest {
  login: string;
  username: string;
  password: string;
  confirmPassword: string | undefined;
  email: string;
  phoneNumber: string;
}

export const prepareDataForRequest = (
  data: dataFotRequest,
): UserRegistration => {
  delete data.confirmPassword;

  if (!data.phoneNumber) {
    data.phoneNumber = "";
  }

  return data;
};
