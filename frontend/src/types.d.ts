export interface User {
  _id: string;
  username: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}

export interface Product {
  _id: string;
  title: string;
  image: string;
  price: string;
}

export interface ProductExpanded extends Product {
  description: string;
  owner: {
    _id: string;
    displayName: string;
    phoneNumber: string;
  };
  category: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ProductMutation {
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
}

export interface RegisterLoginResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
