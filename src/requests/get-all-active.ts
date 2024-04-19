import socket from "@/socket";

export default function getAllActiveUsers(): void {
  socket.send(
    JSON.stringify({
      id: "2",
      type: "USER_ACTIVE",
      payload: null,
    }),
  );
}
