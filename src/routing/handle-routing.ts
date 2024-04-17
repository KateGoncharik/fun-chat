import clearBox from "@/utils";
import safeQuerySelector from "@/utils/safe-query-selector";
import routes from "./routes";

export default async function handleRouting(
  redirectTo?: 'about' | 'auth' | 'main',
): Promise<void> {
  let route;
  if (redirectTo) {
    window.history.pushState(null, "", redirectTo);
    route = routes.redirectTo;
  } else {
    let location = window.location.pathname.slice(1);
    if (location.length === 0) {
      window.history.pushState(null, "", "auth");
      location = "auth";
    }
    route = routes[location] || routes["404"];
  }
  if (!route) {
    return;
  }
  const { component, title } = route;
  document.title = title;
  const contentWrapper = safeQuerySelector<HTMLElement>(".content-wrapper");

  clearBox(contentWrapper);
  contentWrapper.appendChild(component.getNode());
}
