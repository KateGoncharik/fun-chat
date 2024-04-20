import Component from "component";
import type { UserData } from "@/types";
import safeQuerySelector from "@/utils/safe-query-selector";
import createRegisteredUserBlock from "./active-user";

export function fillActiveUsers(data: UserData[]): void {
  const usersBlock = safeQuerySelector(".active-users");
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    throw new Error("User expected");
  }
  data.forEach((user) => {
    if (user.login !== JSON.parse(savedUser).login) {
      const userBlock = createRegisteredUserBlock(user).getNode();
      userBlock.classList.add("active-user");
      usersBlock.appendChild(userBlock);
    }
  });
}

export function fillInactiveUsers(data: UserData[]): void {
  const usersBlock = safeQuerySelector(".inactive-users");

  data.forEach((user) => {
    const userBlock = createRegisteredUserBlock(user).getNode();
    userBlock.classList.add("inactive-user");
    usersBlock.appendChild(userBlock);
  });
}

export default function createRegisteredUsersBlock(): Component {
  const activeUsers = new Component({
    className: "active-users",
    text: "Online",
  });

  const inactiveUsers = new Component({
    className: "inactive-users",
    text: "Offline",
  });

  return new Component({ className: "users" }, activeUsers, inactiveUsers);
}
