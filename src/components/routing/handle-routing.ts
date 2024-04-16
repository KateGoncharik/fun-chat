import clearBox from "@/utils";
import routes from "./routes";

export default async function handleRouting(): Promise<void> {
  const location = window.location.pathname.slice(1);
  if (location.length === 0) {
    window.history.pushState(null, "", "auth");
  }

  const route = routes[location] || routes["404"];
  if (!route) {
    return;
  }

  const { component, title } = route;
  document.title = title;
  const contentWrapper =
    document.querySelector<HTMLElement>(".content-wrapper");
  if (!contentWrapper) {
    throw new Error("Wrapper expected");
  }
  clearBox(contentWrapper);
  contentWrapper?.appendChild(component.getNode());
}
