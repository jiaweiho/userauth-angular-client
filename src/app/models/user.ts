export class User {
  id: number = 0;
  username: string = '';
  password: string = '';
  loginDisabled: boolean = false;
  failedLoginAttempts: number = 0;
  authdata?: string = '';
}