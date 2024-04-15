import handleRouting from "./handle-routing";

export default function handlePathChange(path: string): void {
  const localHistory = window.history;
  localHistory.pushState(null, "", path);
  handleRouting();
}
