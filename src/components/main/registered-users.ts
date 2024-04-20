import Component from "component";

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
