import Component from "component";

export default function createAboutPage(): Component {
  return new Component({
    className: "about-wrapper",
    text: "About",
  });
}
