import { saveSelectedUser } from "@/storage";
import type { UserData } from "@/types";
import Component from "component";

export default function createRegisteredUserBlock({
  login,
}: UserData): Component {
  const userLogin = new Component({
    tag: "p",
    className: "user-login",
    text: login,
  });
  const userBlock = new Component({ className: "registered-user" }, userLogin);
  userLogin.addListener("click", (event) => {
    if (!event.target) {
      throw new Error("Target expected");
    }
    if (event.target instanceof HTMLElement) {
      saveSelectedUser(
        event.target.textContent!,
        event.target.classList.contains("active"),
      );
    }
    // TODO update header and dialog
  });
  return userBlock;
}
