import "./assets/style.css";
import Component from "component";
import createNav from "./components/nav/nav";

export default function startApp(): void {
  const responseBlock = new Component({
    className: "response-block",
  });

  const contentWrapper = new Component({ className: "content-wrapper" });
  const app = new Component(
    { className: "app" },
    createNav(),
    contentWrapper,
    responseBlock,
  );

  document.body.appendChild(app.getNode());
}
