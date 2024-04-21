import { getSelectedUserData } from "@/storage";
import safeQuerySelector from "@/utils/safe-query-selector";
import Component from "component";
import clearBox from "@/utils/clear-box";
import messageBox from "./message";

export default function createDialogHistory(): Component {
  const userData = getSelectedUserData();
  if (!userData) {
    return new Component({ className: "dialog-history-box" });
  }

  return new Component({
    className: "dialog-history-box",
  });
}

type HistoryResponse = {
  id: string;
  type: "MSG_FROM_USER";
  payload: {
    messages: MessageSendResponse[];
  };
};

type MessageSendResponse = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
};

export function fillDialogHistory(response: HistoryResponse): void {
  const dialogHistoryBox = safeQuerySelector(".dialog-history-box");
  clearBox(dialogHistoryBox);
  const savedUser = sessionStorage.getItem("authorized-user");
  if (!savedUser) {
    throw new Error("User expected");
  }
  const { messages } = response.payload;
  messages.forEach((message) => {
    dialogHistoryBox.appendChild(messageBox(message).getNode());
  });
}
