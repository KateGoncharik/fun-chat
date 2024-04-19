import type { UserData } from "../types";

export default function getAuthorizedUser(): UserData | null {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    return null;
  }
  return JSON.parse(savedUser);
}
