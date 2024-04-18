import socket from "@/socket";

import type { UserData } from "@/types";



export default function logoutUser(userData: UserData): void{
  const {id, login, password} = userData;
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
}


