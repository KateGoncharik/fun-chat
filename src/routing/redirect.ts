import clearBox from "@/utils";
import createAboutPage from "@/components/about/about-page";
import safeQuerySelector from "@/utils/safe-query-selector";
// import createAuthPage from "@/components/auth/authPage";

export default function redirectToAbout(): void {
  console.log('we want to redirect to about')
  const contentWrapper = safeQuerySelector(".content-wrapper");
  console.log('in redirect1',contentWrapper)

  clearBox(contentWrapper);
  contentWrapper.appendChild(createAboutPage().getNode());
  const localHistory = window.history;
  localHistory.pushState(null, "", "about");
}



// export  function redirectToAuth(): void {
//   console.log('we want to redirect to auth')
//   const contentWrapper = safeQuerySelector(".content-wrapper");
//   console.log('in redirect2',contentWrapper)

//   clearBox(contentWrapper);
//   contentWrapper.appendChild(createAuthPage().getNode());
//   const localHistory = window.history;
//   localHistory.pushState(null, "", "auth");
// }
