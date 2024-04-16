import "./assets/style.css";
import socket from "./socket";
import handleRouting from "./components/routing/handle-routing";
import startApp, { checkAuthorizedUser } from "./app";

startApp();

const responseBlock = document.querySelector<HTMLElement>(".response-block");
if (responseBlock) {
  socket.onmessage = (messageEvent: MessageEvent): void => {
    responseBlock.textContent += messageEvent.data;
  };
}
handleRouting();
socket.onopen = (): void => {
  checkAuthorizedUser();
};
