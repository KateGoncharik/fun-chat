import Component from "component";
// import redirectToAbout from "@/routing/rename";

import createInputs from "./auth-inputs";
import { handleLogin } from "./auth-handlers";

export default function createAuthPage(): Component  {
  console.log('called')
  // if(sessionStorage.getItem("authorized-user")){
  //   console.log('WWW')
  //   redirectToAbout()
  // }
  const fieldSet = new Component(
    { tag: "fieldset", className: "fieldset" },
    ...createInputs(),
  );
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
