import clearBox from "@/utils";
import routes from "./routes";

export default async function handleRouting(): Promise<void> {
  let location = window.location.pathname.slice(1); // get the url path

  // console.log(location);
  // if the path length is 0, set it to primary page route
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
  const app = document.querySelector<HTMLElement>(".app");
  if (!app) {
    return;
  }
  clearBox(app);
  app?.appendChild(component.getNode());
}
