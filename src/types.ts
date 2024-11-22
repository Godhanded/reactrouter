export type Van = {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  type: string;
  hostId: number;
};

export type Error = {
  message: string;
  statusText: string;
  status: number;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
};

export type UserLoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};
