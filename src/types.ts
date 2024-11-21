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
