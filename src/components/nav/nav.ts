import Component from "component";
import { handleLogout } from "../auth/auth-handlers";
import handlePathChange from "../routing/routing";

export default function createNav(): Component {
  const aboutPageButton = new Component({
    tag: "button",
    className: "about",
    text: "ABOUT",
  });
  aboutPageButton.addListener("click", () => handlePathChange("about"));
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
  );
}
