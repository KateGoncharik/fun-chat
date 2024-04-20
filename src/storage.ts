import type { UserData } from "./types";

function saveAuthorizedUser(userData: {
  login: string;
  password: string;
}): void {
  sessionStorage.setItem("authorized-user", JSON.stringify(userData));
}

function removeAuthorizedUser(): void {
  sessionStorage.removeItem("authorized-user");
}

function getAuthorizedUser(): UserData | null {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    return null;
  }
  return JSON.parse(savedUser);
}

export const activeUsers: UserData[] = [];

export { saveAuthorizedUser, removeAuthorizedUser, getAuthorizedUser };
