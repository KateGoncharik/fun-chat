import clearBox from "@/utils";
import routes from "./routes";

export default async function handleRouting(): Promise<void> {
  let location = window.location.pathname.slice(1); // get the url path

  if (location.length === 0) {
    location = "auth";
    // TODO fix
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
