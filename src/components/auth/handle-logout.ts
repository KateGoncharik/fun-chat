import logoutUser from "@/requests/logout";
import { removeAuthorizedUser } from "@/storage";
import goToPath from "@/routing/handle-path-change";

export default function handleLogout(): void {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    return;
  }
  logoutUser(JSON.parse(savedUser));
  removeAuthorizedUser();
  goToPath("auth");
}
