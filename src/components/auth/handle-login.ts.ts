import { saveAuthorizedUser } from "@/storage";
import redirectToAbout from "@/routing/redirect-to-about";
import loginUser from "@/requests/login";
import collectUserData from "../collect-user-data";
import validateForm from "./validate";

export default function handleLogin(event: Event): void {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const userData = collectUserData();
  loginUser(userData);
  saveAuthorizedUser(userData);
  redirectToAbout();
}

