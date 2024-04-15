import "./assets/style.css";
import Component from "component";
import createNav from "./components/nav/nav";

export default function startApp(): void {
  const responseBlock = new Component({ className: "response-block" });

  const infoWrapper = new Component({ className: "info-wrapper" }, createNav());
  const contentWrapper = new Component(
    { className: "info-wrapper" },
    responseBlock,
  );
  const app = new Component({ className: "app" }, infoWrapper, contentWrapper);

  document.body.appendChild(app.getNode());
}
