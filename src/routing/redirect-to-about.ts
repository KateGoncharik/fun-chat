import clearBox from "@/utils";
import createAboutPage from "@/components/about/about-page";
import safeQuerySelector from "@/utils/safe-query-selector";

export default function redirectToAbout(): void {
  console.log("we want to redirect to about");
  const contentWrapper = safeQuerySelector(".content-wrapper");
  console.log("in redirect1", contentWrapper);

  clearBox(contentWrapper);
  contentWrapper.appendChild(createAboutPage().getNode());
  const localHistory = window.history;
  localHistory.pushState(null, "", "about");
}

