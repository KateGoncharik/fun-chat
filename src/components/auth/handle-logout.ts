import logoutUser from "@/requests/logout";
import { removeAuthorizedUser } from "@/storage";
import safeQuerySelector from "@/utils/safe-query-selector";
import clearBox from "@/utils";
import createAuthPage from "./auth-page";


export  function redirectToAuth(): void {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (savedUser) {
    return;
  }
  console.log('we want to redirect to auth')
  const contentWrapper = safeQuerySelector(".content-wrapper");
  console.log('in redirect to auth',contentWrapper)

  clearBox(contentWrapper);
  contentWrapper.appendChild(createAuthPage().getNode());
  const localHistory = window.history;
  localHistory.pushState(null, "", "auth");
}

export default function handleLogout(): void {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    return;
  }
  logoutUser(JSON.parse(savedUser));
  removeAuthorizedUser();
  redirectToAuth()
}



