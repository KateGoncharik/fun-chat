import Component from "component";
import { routesNames } from "@/constants";
import goToPath from "../../routing/handle-path-change";

export default function createNav(): Component {
  const aboutPageButton = new Component({
    tag: "button",
    className: "about",
    text: "ABOUT",
  });
  aboutPageButton.addListener("click", () => goToPath(routesNames.about));
  const authPageButton = new Component({
    tag: "button",
    className: "auth",
    text: "AUTH",
  });
  authPageButton.addListener("click", () => goToPath(routesNames.auth));

  return new Component(
    { tag: "nav", className: "nav" },
    aboutPageButton,
    authPageButton,
  );
}
