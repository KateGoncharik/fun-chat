import safeQuerySelector from "@/utils/safe-query-selector";

type UserData = {
  // id: string;
  login: string;
  password: string;
};

export default function collectUserData(): UserData {
  const nameInput = safeQuerySelector<HTMLInputElement>(".name-input");
  const userLoginValue = nameInput.value;

  const userPasswordValue =
    safeQuerySelector<HTMLInputElement>(".password-input").value;
  if (!userLoginValue || !userPasswordValue) {
    throw new Error("data expected");
  }
  return {
    // id: "0",
    login: userLoginValue,
    password: userPasswordValue,
  };
}
