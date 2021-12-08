export interface RegisterUserInput {
  Body: {
    email: string;
    username: string;
    password: string;
  };
}

export interface LoginUserInput {
  Body: {
    email: string;
    password: string;
  };
}
