import "./assets/styles/style.css";
import { ResponseId, RouteName } from "@/constants";
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
  if (messageId === ResponseId.Null && isCurrentLocation(RouteName.Main)) {
    getAllUsers();
  }
  if (messageId === ResponseId.Active && isCurrentLocation(RouteName.Main)) {
    fillActiveUsers(messageData.payload.users);
  }
  if (
    messageId === ResponseId.Inactive &&
    window.location.pathname.slice(1) === RouteName.Main
  ) {
    fillInactiveUsers(messageData.payload.users);
  }
};
socket.onopen = (): void => {
  const user = getAuthorizedUser();
  if (user) {
    loginUser(user);
  }
  if (isCurrentLocation(RouteName.Main)) {
    getAllUsers();
  }
};

handleRouting();
window.onpopstate = (): void => {
  handleRouting();
};
