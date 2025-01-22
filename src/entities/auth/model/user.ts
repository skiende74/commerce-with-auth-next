export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserStatus {
  user: User;
  token: string;
}
