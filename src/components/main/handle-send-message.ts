import sendMessage from "@/requests/send-message";

export default function handleSendMessage(to: string, text: string): void {
  // TODO
  sendMessage({ to, text });
}
