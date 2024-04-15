import socket from "@/socket";
import collectUserData from "../collect-user-data";

export function handleLogout(): void {
  // get current user data by id
  socket.send(
    JSON.stringify({
      id: "0",
      type: "USER_LOGOUT",
      payload: {
        user: {
          login: "A",
          password: "1",
        },
      },
    }),
  );
  socket.send(
    JSON.stringify({
      id: "0",
      type: "USER_ACTIVE",
      payload: null,
    }),
  );
  console.log(socket);
}

export function handleLogin(event: Event): void {
  const { id, name, password } = collectUserData();
  console.log(`${id}, ${name}, ${password}`);
  console.log(event);
  console.log(
    "~~~:",
    JSON.stringify({
      id,
      type: "USER_LOGIN",
      payload: {
        user: {
          login: name,
          password,
        },
      },
    }),
  );
  socket.send(
    JSON.stringify({
      id,
      type: "USER_LOGIN",
      payload: {
        user: {
          login: name,
          password,
        },
      },
    }),
  );
  socket.send(
    JSON.stringify({
      id: "0",
      type: "USER_ACTIVE",
      payload: null,
    }),
  );
}
