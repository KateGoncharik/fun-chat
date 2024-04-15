export default function handleRouting(path: string): void {
  const localHistory = window.history;
  localHistory.pushState(null, "", path);
}
