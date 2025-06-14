export const LoginPageLocators = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  menuButton: 'button[aria-label="Open Menu"]', // fallback if `getByRole` not used
  logoutLink: '[data-test="logout-sidebar-link"]'
};
