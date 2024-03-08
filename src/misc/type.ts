export type ProductCategory = {
  id: number;
  name: string;
  image: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: ProductCategory
};

export type logedUserInfo = {
  email : string,
  name : string,
  image : string
}

export type ProductCart = Product & {
  quantity: number;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type User = UserRegister & {
  role: "customer" | "admin";
  id: number;
};

export type UserInfoType = {
  name: string;
  email: string;
  picture: string;
};

export interface CartItem {
  id: string;
}

export type Category = {
  id: number;
  name?: string;
  image?: string;
  creationAt?: string;
  updatedAt?: string;
};

export type ShoppingCartItem = Product & {
  quantity: number;
};

export function isValidURL(url: string) {
  // Regular expression for a valid URL
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
}