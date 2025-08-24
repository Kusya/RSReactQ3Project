export type AuthFormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  password2: string;
  gender: 'male' | 'female' | 'other';
  acceptRules: boolean;
  country: string;
  image?: string;
};
