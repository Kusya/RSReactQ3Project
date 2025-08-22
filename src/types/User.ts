export type User = {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  password2: string;
  gender: string;
  acceptRules: boolean;
  image?: File;
};
