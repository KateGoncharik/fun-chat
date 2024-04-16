import Component from "component";
import { handleLogin } from "./auth-handlers";

function toggleVisibility(): void {
  const passwordInput =
    document.querySelector<HTMLInputElement>(".password-input");
  if (passwordInput) {
    passwordInput.type = passwordInput.type === "text" ? "password" : "text";
  }
}

function createInputs(): Component[] {
  const nameInput = new Component({
    tag: "input",
    className: "name-input",
  });
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name", "name");

  const nameLabel = new Component({
    tag: "label",
    className: "name-label",
    text: "name",
  });
  nameLabel.setAttribute("for", "name");
  const passwordInput = new Component({
    tag: "input",
    className: "password-input",
  });

  passwordInput.setAttribute("type", "password");
  const toggleCheckbox = new Component({
    tag: "input",
    className: "toggle-visibility",
  });
  toggleCheckbox.setAttribute("type", "checkbox");
  toggleCheckbox.addListener("click", toggleVisibility);
  const passwordLabel = new Component({
    tag: "label",
    className: "password-label",
    text: "password",
  });
  passwordLabel.setAttribute("for", "name");
  return [nameLabel, nameInput, passwordLabel, passwordInput, toggleCheckbox];
}

export default function createAuthPage(): Component {
  const fieldSet = new Component({ tag: "fieldset" }, ...createInputs());
  const loginButton = new Component({
    tag: "button",
    className: "login",
    text: "LOGIN",
  });
  loginButton.addListener("click", handleLogin);

  const authForm = new Component(
    { tag: "form", className: "auth-form" },
    fieldSet,
    loginButton,
  );

  const authPage = new Component(
    {
      className: "auth-page",
    },
    authForm,
  );

  return authPage;
}
