import "./assets/style.css";
import socket from "./socket";
import handleRouting from "./routing/handle-routing";
import startApp from "./app";
import safeQuerySelector from "./utils/safe-query-selector";
import loginUser from "./requests/login";
import getAuthorizedUser from "./utils/get-authorised-user";
import { fillRegisteredUsers } from "./components/main/registered-users";
import getAllActiveUsers from "./requests/get-all-active";

startApp();

const responseBlock = safeQuerySelector<HTMLElement>(".response-block");
socket.onmessage = (messageEvent: MessageEvent): void => {
  responseBlock.textContent += messageEvent.data;
  const messageId = JSON.parse(messageEvent.data).id;
  if (messageId === "2") {
    fillRegisteredUsers(JSON.parse(messageEvent.data).payload.users);
  }
};
socket.onopen = (): void => {
  const user = getAuthorizedUser();
  if (user) {
    loginUser(user);
  }
  if (window.location.pathname.slice(1) === "main") {
    getAllActiveUsers();
  }
};

handleRouting();
window.onpopstate = (): void => {
  handleRouting();
};
