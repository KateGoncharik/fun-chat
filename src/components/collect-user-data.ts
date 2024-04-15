type UserData = {
  id: string;
  name: string;
  password: string;
};

export default function collectUserData(): UserData {
  const nameInput = document.querySelector<HTMLInputElement>(".name-input");
  const userName = nameInput?.value;
  const passwordInput =
    document.querySelector<HTMLInputElement>(".password-input");
  const userPassword = passwordInput?.value;
  if (!userName || !userPassword) {
    throw new Error("data expected");
  }
  return {
    id: "0",
    name: userName,
    password: userPassword,
  };
}
