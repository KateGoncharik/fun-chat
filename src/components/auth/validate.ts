export default function validateForm(): boolean {
  const nameInput = document.querySelector<HTMLInputElement>(".name-input");
  const passwordInput =
    document.querySelector<HTMLInputElement>(".password-input");
  if (!nameInput || !passwordInput) {
    throw new Error("Form expected");
  }
  if (nameInput.value && passwordInput.value) {
    return true;
  }
  return false;
}
