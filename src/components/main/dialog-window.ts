import Component from "component";
import createDialogHeader from "./dialog-header";

export default function createDialogWindow(): Component {
  const dialogBox = createDialogHeader();
  return new Component(
    {
      className: "dialog-window",
    },
    dialogBox,
  );
}
