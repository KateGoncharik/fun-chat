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

export const activeUsers: UserData[] = [];

export { saveAuthorizedUser, removeAuthorizedUser };
