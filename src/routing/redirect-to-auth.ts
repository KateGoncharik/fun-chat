import createAuthPage from "@/components/auth/auth-page";
import clearBox from "@/utils";
import safeQuerySelector from "@/utils/safe-query-selector";

export default function redirectToAuth(): void {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (savedUser) {
    return;
  }
  console.log("we want to redirect to auth");
  const contentWrapper = safeQuerySelector(".content-wrapper");

  clearBox(contentWrapper);
  contentWrapper.appendChild(createAuthPage().getNode());
  const localHistory = window.history;
  localHistory.pushState(null, "", "auth");
}
