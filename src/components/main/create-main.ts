import Component from "component";
import createHeader from "./header";
import createFooter from "./footer";

export default function createMainPage(): Component {
  const mainPage = new Component(
    { className: "main-wrapper" },
    createHeader(),
    createFooter(),
  );
  return mainPage;
}
