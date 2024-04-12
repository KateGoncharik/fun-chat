import Component from "component";

function toggleVisibility(): void {
  const passwordInput =
    document.querySelector<HTMLInputElement>(".password-input");
  console.log(passwordInput);
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

export default function createAuthPage(): HTMLElement {
  const fieldSet = new Component({ tag: "fieldset" }, ...createInputs());
  const authForm = new Component(
    { tag: "form", className: "auth-form" },
    fieldSet,
  );

  const authPage = new Component(
    {
      className: "auth-page",
    },
    authForm,
  );
  return authPage.getNode();
}
