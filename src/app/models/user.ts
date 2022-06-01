export interface User {
  username: string;
  password: string;
  loginDisabled?: boolean;
  failedLoginAttempts?: number;
}
