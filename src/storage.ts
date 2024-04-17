function saveAuthorizedUser(userData: {
  id: string;
  login: string;
  password: string;
}): void {
  sessionStorage.setItem("authorized-user", JSON.stringify(userData));
}

function removeAuthorizedUser(): void {
  sessionStorage.removeItem("authorized-user");
}

export { saveAuthorizedUser, removeAuthorizedUser };
