export type Product = {
    id: number;
    name: string;
    price: number;
  };
  
  export type ProductType = {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
  };
  
  export type UserRegister = {
    name: string;
    email: string;
    password: string;
    avatar: string;
  };