import Component from "component";
import createInputs from "./auth-inputs";
import handleLogin from "./handle-login.ts";

export default function createAuthPage(): Component {
  const fieldSet = new Component(
    { tag: "fieldset", className: "fieldset" },
    ...createInputs(),
  );
  const loginButton = new Component({
    tag: "button",
    className: "login",
    text: "LOGIN",
  });
  loginButton.addListener("click", (event) => {
    handleLogin(event);
  });

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
