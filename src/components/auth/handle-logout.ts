import logoutUser from "@/requests/logout";
import { removeAuthorizedUser } from "@/storage";



export default function handleLogout(): void {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    return;
  }
  logoutUser(JSON.parse(savedUser));
  removeAuthorizedUser();
}
