import { saveAuthorizedUser, removeAuthorizedUser } from "@/storage";
import redirectToAbout from "@/routing/redirect";
import loginUser from "@/requests/login";
import logoutUser from "@/requests/logout";
import collectUserData from "../collect-user-data";
import validateForm from "./validate";


export function handleLogin(event: Event): void {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const userData = collectUserData();
  loginUser(userData)
  saveAuthorizedUser(userData);
  redirectToAbout();
}

export function handleLogout(): void {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    return;
  }
  logoutUser(JSON.parse(savedUser))
  removeAuthorizedUser();
}
