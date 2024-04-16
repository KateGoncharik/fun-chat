type UserData = {
  id: string;
  login: string;
  password: string;
};

export default function collectUserData(): UserData {
  const nameInput = document.querySelector<HTMLInputElement>(".name-input");
  // TODO refactor
  const userLogin = nameInput?.value;
  const passwordInput =
    document.querySelector<HTMLInputElement>(".password-input");
  const userPassword = passwordInput?.value;
  if (!userLogin || !userPassword) {
    throw new Error("data expected");
  }
  return {
    id: "0",
    login: userLogin,
    password: userPassword,
  };
}
