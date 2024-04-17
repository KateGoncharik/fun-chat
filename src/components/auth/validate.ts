import safeQuerySelector from "@/utils/safe-query-selector";

export default function validateForm(): boolean {
  const nameInput = safeQuerySelector<HTMLInputElement>(".name-input");
  const passwordInput = safeQuerySelector<HTMLInputElement>(".password-input");

  if (nameInput.value && passwordInput.value) {
    return true;
  }
  return false;
}
