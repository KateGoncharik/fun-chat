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

  return new Component({ className: "registered-user" }, userLogin);
}
