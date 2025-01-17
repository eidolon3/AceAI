<<<<<<< HEAD
=======
export interface User {
  id: string;
  email: string;
  password: string;  // Will be hashed
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
export interface UserSignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

<<<<<<< HEAD
export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

=======
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}
