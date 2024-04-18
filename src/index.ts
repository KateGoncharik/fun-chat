import "./assets/style.css";
import socket from "./socket";
import handleRouting from "./routing/handle-routing";
import startApp from "./app";
import safeQuerySelector from "./utils/safe-query-selector";
import loginUser from "./requests/login";
import  getAuthorisedUser  from "./utils/get-authorised-user";


startApp();

const responseBlock = safeQuerySelector<HTMLElement>(".response-block");
socket.onmessage = (messageEvent: MessageEvent): void => {
  responseBlock.textContent += messageEvent.data;
};
socket.onopen = (): void => {
  const user = getAuthorisedUser();
  if(user) {
    loginUser(user)
  }
};

handleRouting();


