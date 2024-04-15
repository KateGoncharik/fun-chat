import Component from "component";
import createAuthPage from "../auth/authPage";
import createAboutPage from "../about/about-page";

type Path = {
  title: string;
  component: Component;
};

const routes: { [key: string]: Path } = {
  404: {
    component: new Component({}),
    title: "404",
  },
  auth: {
    component: createAuthPage(),
    title: "Auth",
  },
  about: {
    component: createAboutPage(),
    title: "About Us",
  },
  main: {
    component: new Component({}),
    title: "Main",
  },
};

export default routes;
