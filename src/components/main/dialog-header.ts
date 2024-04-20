import { getSelectedUser } from "@/storage";
import safeQuerySelector from "@/utils/safe-query-selector";
import Component from "component";

export default function createDialogHeader(): Component {
  const userData = getSelectedUser();
  if (!userData) {
    return new Component({});
  }
  const [login, isActive] = userData.split(" ");

  const loginOfCompanion = new Component({
    className: "login-of-companion",
    text: login ?? "",
  });
  const statusOfCompanion = new Component({
    className: "status-of-companion",
    text: isActive ? "online" : "offline",
  });
  statusOfCompanion.getNode().classList.add(isActive ? "online" : "offline");

  return new Component(
    {
      className: "dialog-header",
    },
    loginOfCompanion,
    statusOfCompanion,
  );
}

export function updateSelectedUserStatus(isActive: boolean): void {
  const selectedUser = getSelectedUser();
  if (!selectedUser) {
    return;
  }
  const statusElement = safeQuerySelector(".status-of-companion");
  if (isActive) {
    console.log("set online, status is :", isActive);

    statusElement.innerText = "online";

    statusElement.classList.remove("online");
    statusElement.classList.add("online");
  } else {
    console.log("set offline, status is :", isActive);
    statusElement.innerText = "offline";
    statusElement.classList.remove("online");
  }
}
