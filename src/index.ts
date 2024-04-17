import "./assets/style.css";
import socket from "./socket";
import handleRouting from "./components/routing/handle-routing";
import startApp, { checkAuthorizedUser } from "./app";
import safeQuerySelector from "./utils/safe-query-selector";

startApp();

const responseBlock = safeQuerySelector<HTMLElement>(".response-block");
socket.onmessage = (messageEvent: MessageEvent): void => {
  responseBlock.textContent += messageEvent.data;
};
handleRouting();
socket.onopen = (): void => {
  checkAuthorizedUser();
};
