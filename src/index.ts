import "./assets/styles/style.css";
import { responseIds, routesNames } from "@/constants";
import socket from "./socket";
import handleRouting from "./routing/handle-routing";
import startApp from "./app";
import loginUser from "./requests/login";
import { getAuthorizedUser } from "./storage";
import {
  fillActiveUsers,
  fillInactiveUsers,
} from "./components/main/fill-users-block";

import getAllUsers from "./utils/getAllUsers";

startApp();

socket.onmessage = (messageEvent: MessageEvent): void => {
  const messageId = JSON.parse(messageEvent.data).id;
  if (
    messageId === responseIds.null &&
    window.location.pathname.slice(1) === routesNames.main
  ) {
    getAllUsers();
  }
  if (
    messageId === responseIds.active &&
    window.location.pathname.slice(1) === routesNames.main
  ) {
    fillActiveUsers(JSON.parse(messageEvent.data).payload.users);
  }
  if (
    messageId === responseIds.inactive &&
    window.location.pathname.slice(1) === routesNames.main
  ) {
    fillInactiveUsers(JSON.parse(messageEvent.data).payload.users);
  }
};
socket.onopen = (): void => {
  const user = getAuthorizedUser();
  if (user) {
    loginUser(user);
  }
  if (window.location.pathname.slice(1) === routesNames.main) {
    getAllUsers();
  }
};

handleRouting(); // ?
window.onpopstate = (): void => {
  handleRouting();
};
