import socket from "@/socket";
import { saveAuthorizedUser, removeAuthorizedUser } from "@/storage";
import { rename } from "@/routing/rename";
import collectUserData from "../collect-user-data";
import validateForm from "./validate";


export function handleLogin(event: Event): void {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const { id, login, password } = collectUserData();

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
  saveAuthorizedUser({ id, login, password });
  rename()
}

export function handleLogout(): void {
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    return;
  }
  const { id, login, password } = JSON.parse(savedUser);
  socket.send(
    JSON.stringify({
      id,
      type: "USER_LOGOUT",
      payload: {
        user: {
          login,
          password,
        },
      },
    }),
  );
  removeAuthorizedUser();
}
