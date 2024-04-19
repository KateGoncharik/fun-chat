import Component from "component";
import createHeader from "./header";

export default function createMainPage(): Component {
  const mainPage = new Component({ className: "main-wrapper" }, createHeader());
  return mainPage;
}
