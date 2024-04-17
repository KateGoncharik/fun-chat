import clearBox from "@/utils";
import safeQuerySelector from "@/utils/safe-query-selector";

import routes from "./routes";

export default async function handleRouting(): Promise<void> {
  let location = window.location.pathname.slice(1);
  if (location.length === 0) {
    window.history.pushState(null, "", "auth");
    location = 'auth';
  }

  const route = routes[location] || routes["404"];
  if (!route) {
    return;
  }

  const { component, title } = route;
  document.title = title;
  const contentWrapper = safeQuerySelector<HTMLElement>(".content-wrapper");

  clearBox(contentWrapper);
  contentWrapper.appendChild(component.getNode());
}
