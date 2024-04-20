import "./assets/style.css";
import socket from "./socket";
import handleRouting from "./routing/handle-routing";
import startApp from "./app";
import safeQuerySelector from "./utils/safe-query-selector";
import loginUser from "./requests/login";
import getAuthorizedUser from "./utils/get-authorised-user";
import {
  fillActiveUsers,
  fillInactiveUsers,
} from "./components/main/registered-users";

import getAllUsers from "./utils/getAllUsers";

startApp();

const responseBlock = safeQuerySelector<HTMLElement>(".response-block");

socket.onmessage = (messageEvent: MessageEvent): void => {
  responseBlock.textContent += messageEvent.data;
  const messageId = JSON.parse(messageEvent.data).id;
  console.log(`msgId: ${messageId}, loc: ${window.location.pathname}`);
  if (messageId === null && window.location.pathname.slice(1) === "main") {
    console.log("aaa");
    getAllUsers();
  }
  if (messageId === "active" && window.location.pathname.slice(1) === "main") {
    fillActiveUsers(JSON.parse(messageEvent.data).payload.users);
  }
  if (
    messageId === "inactive" &&
    window.location.pathname.slice(1) === "main"
  ) {
    fillInactiveUsers(JSON.parse(messageEvent.data).payload.users);
  }
};
socket.onopen = (): void => {
  const user = getAuthorizedUser();
  if (user) {
    loginUser(user);
  }
  if (window.location.pathname.slice(1) === "main") {
    getAllUsers();
  }
};

handleRouting(); // ?
window.onpopstate = (): void => {
  handleRouting();
};
