export const prepareDataForRequest = (refData: any, userData: any) => {
  if (
    refData.username === userData.username &&
    refData.email === userData.email &&
    refData.phoneNumber === userData.phoneNumber
  ) {
    return false;
  } else {
    const newUserData = {
      username: refData.username,
      email: refData.email,
      phoneNumber: refData.phoneNumber,
    };
    if (refData.username === userData.username) delete newUserData.username;
    if (refData.email === userData.email) delete newUserData.email;
    if (refData.phoneNumber === userData.phoneNumber)
      delete newUserData.phoneNumber;

    return newUserData;
  }
};
