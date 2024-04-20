import "./assets/styles/style.css";
import { ResponseId, RouteName } from "@/constants";
import socket from "./socket";
import handleRouting from "./routing/handle-routing";
import startApp from "./app";
import loginUser from "./requests/login";
import { getAuthorizedUser, getSelectedUser } from "./storage";
import {
  fillActiveUsers,
  fillInactiveUsers,
} from "./components/main/fill-users-block";
import isCurrentLocation from "./utils/compare-location";
import getAllUsers from "./utils/get-all-users";
import { updateSelectedUserStatus } from "./components/main/dialog-header";
import type { UserData } from "./types";

startApp();

type Response = {
  id: string | null;
  type: string;
  payload: { users: [] };
};

function handleActiveUsersOnMainUpdate(messageData: Response): void {
  const { users } = messageData.payload;
  fillActiveUsers(users);
  const selectedUserData = getSelectedUser();
  if (!selectedUserData) {
    return;
  }
  const selectedUserLogin = selectedUserData.split(" ")[0];
  const selectedUserIsActiveNow = users.filter(
    (user: UserData) => user.login === selectedUserLogin,
  );
  if (selectedUserIsActiveNow.length) {
    updateSelectedUserStatus(true);
  }
}

function handleInactiveUsersOnMainUpdate(messageData: Response): void {
  const { users } = messageData.payload;
  fillInactiveUsers(users);
  const selectedUserData = getSelectedUser();
  if (!selectedUserData) {
    return;
  }
  const selectedUserLogin = selectedUserData.split(" ")[0];
  const selectedUserIsNotActiveNow = users.filter(
    (user: UserData) => user.login === selectedUserLogin,
  );
  if (selectedUserIsNotActiveNow.length) {
    updateSelectedUserStatus(false);
  }
}

socket.onmessage = (messageEvent: MessageEvent): void => {
  let messageData = messageEvent.data;
  try {
    messageData = JSON.parse(messageEvent.data);
  } catch (err) {
    throw new Error("Message data expected");
  }
  const messageId = messageData.id;
  if (messageId === ResponseId.Null && isCurrentLocation(RouteName.Main)) {
    getAllUsers();
  }
  if (messageId === ResponseId.Active && isCurrentLocation(RouteName.Main)) {
    handleActiveUsersOnMainUpdate(messageData);
  } else if (
    messageId === ResponseId.Inactive &&
    window.location.pathname.slice(1) === RouteName.Main
  ) {
    handleInactiveUsersOnMainUpdate(messageData);
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
