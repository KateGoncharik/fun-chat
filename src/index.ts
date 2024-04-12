import "./assets/style.css";
import createAuthPage from "./components/authPage";

const app = document.createElement("div");
app.classList.add("app");

const responseBlock = document.createElement("div");
responseBlock.classList.add("response-block");
document.body.appendChild(app);
const socket = new WebSocket("ws://localhost:4000");

socket.onmessage = (messageEvent: MessageEvent): void => {
  responseBlock.textContent += messageEvent.data;
};

function collectUserData(): UserData {
  const nameInput = document.querySelector<HTMLInputElement>(".name-input");
  const userName = nameInput?.value;
  const passwordInput =
    document.querySelector<HTMLInputElement>(".password-input");
  const userPassword = passwordInput?.value;
  if (!userName || !userPassword) {
    throw new Error("data expected");
  }
  return {
    id: 0,
    name: userName,
    password: userPassword,
  };
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
  console.log(socket);
}

export function handleLogout(event: Event): void {
  // get current user data by id
  console.log(event);
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

const loginButton = document.createElement("button");
loginButton.classList.add("login");
loginButton.textContent = "LOGIN";

loginButton.addEventListener("click", handleLogin);

const logoutButton = document.createElement("button");
logoutButton.classList.add("logout");
logoutButton.textContent = "LOGOUT";
logoutButton.addEventListener("click", handleLogout);

app.appendChild(createAuthPage());

app.appendChild(loginButton);
app.appendChild(logoutButton);
app.appendChild(responseBlock);

type UserData = {
  id: number;
  name: string;
  password: string;
};
