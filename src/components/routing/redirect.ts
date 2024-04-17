import safeQuerySelector from "@/utils/safe-query-selector";
import clearBox from "@/utils";
import routes from "./routes";

export default function redirect(): void {
  window.history.pushState(null, "", "about");

  
  const route = routes.about;
  if (!route) {
    return;
  }

  const { component, title } = route;
  document.title = title;
  const contentWrapper = safeQuerySelector<HTMLElement>(".content-wrapper");

  clearBox(contentWrapper);
  contentWrapper.appendChild(component.getNode());
}
