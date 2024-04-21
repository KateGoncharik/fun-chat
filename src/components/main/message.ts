import Component from "component";

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

export default function messageBox(message: MessageSendResponse): Component {
  const messageText = message.text;
  return new Component({
    className: "sent-message",
    text: messageText,
  });
}
