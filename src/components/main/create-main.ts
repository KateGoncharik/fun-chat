import Component from "component";
import createHeader from "./header";
import createFooter from "./footer";
import createRegisteredUsersBlock from "./registered-users";

export default function createMainPage(): Component {
  const users = createRegisteredUsersBlock();
  const mainPage = new Component(
    { className: "main-wrapper" },
    createHeader(),
    users,
    createFooter(),
  );
  return mainPage;
}
