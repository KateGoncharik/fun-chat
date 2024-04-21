import { saveSelectedUserData } from "@/storage";
import type { UserData } from "@/types";
import Component from "component";
import { updateDialogHeader } from "./dialog-header";

export default function createUserBlock({ login }: UserData): Component {
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
      saveSelectedUserData(
        event.target.textContent!,
        event.target.classList.contains("active"),
      );
    }
    updateDialogHeader();
  });
  return userBlock;
}
