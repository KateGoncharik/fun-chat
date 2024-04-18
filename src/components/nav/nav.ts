import Component from "component";
import { handleLogout } from "../auth/auth-handlers";
import handlePathChange from "../../routing/handle-path-change";

export default function createNav(): Component {
  const aboutPageButton = new Component({
    tag: "button",
    className: "about",
    text: "ABOUT",
  });
  aboutPageButton.addListener("click", () => handlePathChange("about"));
  const authPageButton = new Component({
    tag: "button",
    className: "auth",
    text: "AUTH",
  });
  authPageButton.addListener("click", () => handlePathChange("auth"));
  const logoutButton = new Component({
    tag: "button",
    className: "logout",
    text: "LOGOUT",
  });

  logoutButton.addListener("click", handleLogout);

  return new Component(
    { tag: "nav", className: "nav" },
    logoutButton,
    aboutPageButton,
    authPageButton,
  );
}
