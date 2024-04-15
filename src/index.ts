import "./assets/style.css";
import Component from "component";
import createAuthPage from "./components/auth/authPage";
import handleRouting from "./components/routing/routing";
import { handleLogin, handleLogout } from "./components/auth/auth-handlers";
import socket from "./socket";

const app = new Component({ className: "app" });

const responseBlock = new Component({ className: "response-block" });
document.body.appendChild(app.getNode());

socket.onmessage = (messageEvent: MessageEvent): void => {
  responseBlock.getNode().textContent += messageEvent.data;
};

const loginButton = new Component({
  tag: "button",
  className: "login",
  text: "LOGIN",
});

loginButton.addListener("click", handleLogin);

const logoutButton = new Component({
  tag: "button",
  className: "logout",
  text: "LOGOUT",
});

logoutButton.addListener("click", handleLogout);

const aboutPageButton = new Component({
  tag: "button",
  className: "about",
  text: "ABOUT",
});
aboutPageButton.addListener("click", () => handleRouting("about"));

app.append(createAuthPage());
app.append(aboutPageButton);
app.append(loginButton);
app.append(logoutButton);
app.append(responseBlock);
