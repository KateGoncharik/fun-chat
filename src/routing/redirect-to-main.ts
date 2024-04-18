import clearBox from "@/utils";
import safeQuerySelector from "@/utils/safe-query-selector";
import createMainPage from "@/components/main/create-main";

export default function redirectToMain(): void {
  console.log("we want to redirect to main");
  const contentWrapper = safeQuerySelector(".content-wrapper");

  clearBox(contentWrapper);
  contentWrapper.appendChild(createMainPage().getNode());
  const localHistory = window.history;
  localHistory.pushState(null, "", "main");
}
