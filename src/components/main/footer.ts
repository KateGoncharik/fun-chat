import Component from "component";

export default function createFooter(): Component {
  const year = new Component({
    className: "header-title",
    text: "2024",
  });

  const logo = new Component({ tag: "img", className: "school-logo" });
  logo.setAttribute("src", "");
  return new Component({ tag: "header", className: "main-header" }, year, logo);
}
