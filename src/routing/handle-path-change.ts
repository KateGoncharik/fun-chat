import handleRouting from "./handle-routing";

export default function goToPath(path: string): void {
  const localHistory = window.history;
  localHistory.pushState(null, "", path);
  handleRouting();
}
