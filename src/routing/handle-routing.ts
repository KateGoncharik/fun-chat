import clearBox from "@/utils";
import safeQuerySelector from "@/utils/safe-query-selector";
import getAuthorizedUser from "@/utils/get-authorised-user";

import getAllUsers from "@/utils/getAllUsers";
import routes from "./routes";
import goToPath from "./handle-path-change";

export default async function handleRouting(): Promise<void> {
  let location = window.location.pathname.slice(1);
  if (location.length === 0) {
    location = "auth";
    goToPath("auth");
  }
  if (getAuthorizedUser() && location === "auth") {
    location = "main";
    goToPath("main");
    getAllUsers();
  }

  if (!getAuthorizedUser() && location === "main") {
    location = "auth";
    goToPath("auth");
  }
  const route = routes[location] || routes["404"];

  if (!route) {
    return;
  }

  const { getComponent, title } = route;
  document.title = title;
  const contentWrapper = safeQuerySelector<HTMLElement>(".content-wrapper");

  clearBox(contentWrapper);
  contentWrapper.appendChild(getComponent().getNode());
}
