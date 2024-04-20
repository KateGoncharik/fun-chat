import { saveAuthorizedUser } from "@/storage";
import loginUser from "@/requests/login";
import goToPath from "@/routing/handle-path-change";
import getAllUsers from "@/utils/get-all-users";
import { routesNames } from "@/constants";
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
  goToPath(routesNames.main);
  getAllUsers();
}
