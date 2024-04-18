import Component from "component";
import  handleLogout  from "../auth/handle-logout";
import goToPath from "../../routing/handle-path-change";

export default function createNav(): Component {
  const aboutPageButton = new Component({
    tag: "button",
    className: "about",
    text: "ABOUT",
  });
  aboutPageButton.addListener("click", () => goToPath("about"));
  const authPageButton = new Component({
    tag: "button",
    className: "auth",
    text: "AUTH",
  });
  authPageButton.addListener("click", () => goToPath("auth"));
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
