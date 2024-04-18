import createMainPage from "@/components/main/create-main";
import Component from "component";
import createAuthPage from "../components/auth/auth-page";
import createAboutPage from "../components/about/about-page";

export type Path = {
  title: string;
  component: Component;
};

type Routes = { [key: string]: Path };

const routes: Routes = {
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
    component: createMainPage(),
    title: "Main",
  },
};

export default routes;
