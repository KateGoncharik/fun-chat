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
import isCurrentLocation from "./utils/compare-location";
import getAllUsers from "./utils/get-all-users";

startApp();

socket.onmessage = (messageEvent: MessageEvent): void => {
  let messageData = messageEvent.data;
  try {
    messageData = JSON.parse(messageEvent.data);
  } catch (err) {
    console.error(`Error occurred while getting message: ${err}`);
  }
  const messageId = messageData.id;
  if (messageId === responseIds.null && isCurrentLocation(routesNames.main)) {
    getAllUsers();
  }
  if (messageId === responseIds.active && isCurrentLocation(routesNames.main)) {
    fillActiveUsers(JSON.parse(messageEvent.data).payload.users);
  }
  if (
    messageId === responseIds.inactive &&
    window.location.pathname.slice(1) === routesNames.main
  ) {
    fillInactiveUsers(messageData.payload.users);
  }
};
socket.onopen = (): void => {
  const user = getAuthorizedUser();
  if (user) {
    loginUser(user);
  }
  if (isCurrentLocation(routesNames.main)) {
    getAllUsers();
  }
};

handleRouting();
window.onpopstate = (): void => {
  handleRouting();
};
