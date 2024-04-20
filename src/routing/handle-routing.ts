import clearBox from "@/utils";
import safeQuerySelector from "@/utils/safe-query-selector";
import getAllUsers from "@/utils/getAllUsers";
import { getAuthorizedUser } from "@/storage";
import { routesNames } from "@/constants";
import routes from "./routes";
import goToPath from "./handle-path-change";

export default async function handleRouting(): Promise<void> {
  let location = window.location.pathname.slice(1);
  if (location.length === 0) {
    location = routesNames.auth;
    goToPath(routesNames.auth);
  }
  if (getAuthorizedUser() && location === routesNames.auth) {
    location = routesNames.main;
    goToPath(routesNames.main);
    getAllUsers();
  }

  if (!getAuthorizedUser() && location === routesNames.main) {
    location = routesNames.auth;
    goToPath(routesNames.auth);
  }
  const route = routes[location] || routes[routesNames[404]];

  if (!route) {
    return;
  }

  const { getComponent, title } = route;
  document.title = title;
  const contentWrapper = safeQuerySelector<HTMLElement>(".content-wrapper");

  clearBox(contentWrapper);
  contentWrapper.appendChild(getComponent().getNode());
}
