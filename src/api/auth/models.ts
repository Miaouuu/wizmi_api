export interface UserRegisterInput {
  Body: {
    email: string;
    username: string;
    password: string;
  };
}

export interface UserLoginInput {
  Body: {
    email: string;
    password: string;
  };
}
