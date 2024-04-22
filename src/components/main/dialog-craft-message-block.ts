import { getSelectedUserData } from "@/storage";
import Component from "component";
import safeQuerySelector from "@/utils/safe-query-selector";
import handleSendMessage from "./handle-send-message";

export default function dialogCraftMessageBlock(): Component {
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

  const userData = getSelectedUserData();
  if (userData) {
    const [login] = userData.split(" ");
    if (!login) {
      throw new Error("Login expected");
    }
    sendMessageButton.addListener("click", () => {
      console.log("BBB");
      const input = safeQuerySelector<HTMLInputElement>(".message-input");
      // TODO validate empty input
      handleSendMessage(login, input.value);
    });
  } else {
    messageInput.setAttribute("disabled", "true");
    sendMessageButton.setAttribute("disabled", "true");
  }

  return new Component(
    {
      className: "dialog-craft-message-box",
    },
    messageInput,
    sendMessageButton,
  );
}

export function updateCraftMessageBox(): void {
  const userData = getSelectedUserData();
  if (!userData) {
    throw new Error("Selected user expected");
  }
  safeQuerySelector(".message-input").removeAttribute("disabled");
  safeQuerySelector(".send-message-button").removeAttribute("disabled");
}
