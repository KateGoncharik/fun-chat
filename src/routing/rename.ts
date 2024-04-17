import clearBox from "@/utils";
import createAboutPage from "@/components/about/about-page";
import safeQuerySelector from "@/utils/safe-query-selector";

export function rename(){
  const contentWrapper = safeQuerySelector('content-wrapper'); 
  clearBox( safeQuerySelector('content-wrapper'))
   contentWrapper.appendChild(createAboutPage().getNode())
   const localHistory = window.history;
   localHistory.pushState(null, "", 'about');
}
