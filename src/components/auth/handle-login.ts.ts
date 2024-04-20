import { saveAuthorizedUser } from "@/storage";
import loginUser from "@/requests/login";
import changePage from "@/routing/change-page";
import getAllUsers from "@/utils/get-all-users";
import { RouteName } from "@/constants";
import collectUserData from "./collect-user-data";
import validateForm from "./validate";

export default function handleLogin(event: Event): void {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const userData = collectUserData();
  loginUser(userData);
  saveAuthorizedUser(userData);
  changePage(RouteName.Main);
  getAllUsers();
}
