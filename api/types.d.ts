export interface UserFields {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}

export interface ProductMutation {
  owner: string;
  category: string;
  title: string;
  description: string;
  image: string | undefined;
  price: string;
}