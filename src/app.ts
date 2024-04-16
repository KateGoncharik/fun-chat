import "./assets/style.css";
import Component from "component";
import createNav from "./components/nav/nav";
import socket from "./socket";

export function checkAuthorizedUser(): void {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    return;
  }
  const { id, login, password } = JSON.parse(savedUser);
  socket.send(
    JSON.stringify({
      id,
      type: "USER_LOGIN",
      payload: {
        user: {
          login,
          password,
        },
      },
    }),
  );
}

export default function startApp(): void {
  const responseBlock = new Component({
    className: "response-block",
  });

  const infoWrapper = new Component({ className: "info-wrapper" }, createNav());
  const contentWrapper = new Component({ className: "content-wrapper" });
  const app = new Component(
    { className: "app" },
    infoWrapper,
    contentWrapper,
    responseBlock,
  );

  document.body.appendChild(app.getNode());
}
