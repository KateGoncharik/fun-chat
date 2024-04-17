import socket from "@/socket";
import changeButtonAbility from "@/utils/change-button-ability";

import collectUserData from "../collect-user-data";
import validateForm from "./validate";


// TODO put in LS
function saveAuthorizedUser(userData: {
  id: string;
  login: string;
  password: string;
}): void {
  sessionStorage.setItem("authorized-user", JSON.stringify(userData));
}

function removeAuthorizedUser(): void {
  sessionStorage.removeItem("authorized-user");
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

  socket.send(
    JSON.stringify({
      id: "0",
      type: "USER_ACTIVE",
      payload: null,
    }),
  );
}

export function handleLogin(event: Event): void {
  event.preventDefault();


  if (!validateForm()) {
  changeButtonAbility('login', true)
    return;
  }
  changeButtonAbility('login', false)
  
  
  const { id, login, password } = collectUserData();
  saveAuthorizedUser({ id, login, password });

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
  socket.send(
    JSON.stringify({
      id: "0",
      type: "USER_ACTIVE",
      payload: null,
    }),
  );
}


export function handleInputChange():void {
 
  if(validateForm()){
    changeButtonAbility('login', false)
  } else{
    changeButtonAbility('login', true)
  }
}
