import { getSelectedUserData } from "@/storage";
import Component from "component";
import safeQuerySelector from "@/utils/safe-query-selector";
import handleSendMessage from "./handle-send-message";

export default function dialogCraftMessageBlock(): Component {
  const userData = getSelectedUserData();
  if (!userData) {
    return new Component(
      { className: "dialog-craft-message-box" },
      new Component({
        tag: "input",
        className: "message-input",
      }),
    );
  }
  const [login] = userData.split(" ");
  if (!login) {
    throw new Error("No user selected");
  }
  const messageInput = new Component({
    tag: "input",
    className: "message-input",
  });
  messageInput.setAttribute("type", "text");

  messageInput.setAttribute("placeholder", "Start typing your message..");

  const sendMessageButton = new Component({
    tag: "button",
    className: "send-message-button",
    text: "Send",
  });
  sendMessageButton.addListener("click", () => {
    const input = safeQuerySelector<HTMLInputElement>(".message-input");
    handleSendMessage(login, input.value);
  });
  return new Component(
    {
      className: "dialog-craft-message-box",
    },
    messageInput,
    sendMessageButton,
  );
}
