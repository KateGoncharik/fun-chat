import Component from "component";
import type { UserData } from "@/types";
import safeQuerySelector from "@/utils/safe-query-selector";
import createActiveUserBlock from "./active-user";

function getUsersBlock(): HTMLElement {
  return safeQuerySelector(".active-users");
}
export function fillRegisteredUsers(data: UserData[]): void {
  const usersBlock = getUsersBlock();
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    throw new Error("User expected");
  }
  data.forEach((user) => {
    if (user.login !== JSON.parse(savedUser).login) {
      usersBlock.appendChild(createActiveUserBlock(user).getNode());
    }
  });
}

export default function createRegisteredUsersBlock(): Component {
  const activeUsers = new Component({
    className: "active-users",
    text: "Online",
  });

  return new Component({ className: "users" }, activeUsers);
}
