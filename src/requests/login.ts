import socket from "@/socket";
import type { UserData } from "@/types";

export default function loginUser(userData: UserData): void {
  const { login, password } = userData;
  socket.send(
    JSON.stringify({
      id: "login",
      type: "USER_LOGIN",
      payload: {
        user: {
          login,
          password,
        },
      },
    }),
  );
}
