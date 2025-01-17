export interface User {
  id: string;
  email: string;
  password: string;  // Will be hashed
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}
