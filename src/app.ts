import "./assets/style.css";
import Component from "component";
import createNav from "./components/nav/nav";
import socket from "./socket";
import handleRouting from "./routing/handle-routing";

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
  handleRouting("about");
}

export default function startApp(): void {
  const responseBlock = new Component({
    className: "response-block",
  });

  const contentWrapper = new Component({ className: "content-wrapper" });
  const app = new Component(
    { className: "app" },
    createNav(),
    contentWrapper,
    responseBlock,
  );

  document.body.appendChild(app.getNode());
}
