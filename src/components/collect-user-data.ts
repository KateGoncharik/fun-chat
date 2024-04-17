import safeQuerySelector from "@/utils/safe-query-selector";

type UserData = {
  id: string;
  login: string;
  password: string;
};

export default function collectUserData(): UserData {
  const nameInput = safeQuerySelector<HTMLInputElement>(".name-input");
  // TODO refactor
  const userLogin = nameInput.value;
 
  const userPassword =  safeQuerySelector<HTMLInputElement>(".password-input").value;
  if (!userLogin || !userPassword) {
    throw new Error("data expected");
  }
  return {
    id: "0",
    login: userLogin,
    password: userPassword,
  };
}
