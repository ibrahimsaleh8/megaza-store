import { ZodIssue } from "zod";
// ****************** Server Types ******************
export type registerBodyType = {
  username: string;
  email: string;
  password: string;
};
export type loginBodyType = {
  email: string;
  password: string;
};

export type jwtPayloadType = {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
};

// ****************** Client Types ******************

export type SchemaType = {
  message?: string;
  error?: ZodIssue[];
};

export type registerInfoType = {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
};
export type CategoriesType = {
  id: number;
  name: string;
};
export type ProductType = {
  title: string;
  brandName: string;
  price: number;
  categoryId: number;
  description: string;
  card_image: string;
  hasDiscount: boolean;
  discount: number;
  images: string[];
  amount: number;
  colors: {
    color: string;
    available: number;
  }[];
  sizes: {
    size: string;
    available: number;
  }[];
};
export type AddProductType = {
  title: string;
  brandName: string;
  price: number;
  categoryId: number;
  description: string;
  card_image: string;
  hasDiscount: boolean;
  discount: number;
  images: string[];
  amount: number;
  colors: {
    color: string;
    available: number;
  }[];
  sizes: {
    size: string;
    available: number;
  }[];
};

export type NewCommentType = {
  content: string;
  rating: number;
  productId: string;
  userId: number;
};
export type EditeCommentType = {
  content: string;
  rating: number;
  userId: number;
};
export type ProductCommentType = {
  id: number;
  content: string;
  rating: number;
  user: {
    id: number;
    username: string;
  };
  created_at: string;
};
export type ErrorResponseType = {
  response: { data: { message: string } };
};
export type ShowProductType = {
  id: string;
  title: string;
  available: boolean;
  description: string;
  price: number;
  brandName: string;
  category: {
    id: number;
    name: string;
    products: {
      id: string;
      title: string;
      price: number;
      card_image: string;
      discount: number;
      hasDiscount: boolean;
      amount: number;
      available: boolean;
      colors: {
        available: number;
        color: string;
      }[];
      sizes: {
        available: number;
        size: string;
      }[];
    }[];
  };
  card_image: string;
  images: string[];
  hasDiscount: boolean;
  discount?: number;
  colors: {
    available: number;
    color: string;
  }[];
  sizes: {
    available: number;
    size: string;
  }[];
  amount: number;
};
export type CartRequestType = {
  userId: number;
  item: {
    quantity: number;
    color: string;
    size: string;
    productId: string;
  };
};
export type ProductCardType = {
  id: string;
  title: string;
  card_image: string;
  price: number;
  available: boolean;
  hasDiscount: boolean;
  discount?: number;
};

export type CartItemType = {
  id: number;
  quantity: number;
  color: string;
  size: string;
  product: ProductCardType;
};
export type ContextDataType = {
  userId: number;
  cartProducts: CartItemType[];
};
export type RequestDeleteFromCart = {
  cartProductId: number;
};

export type WishListRequestType = {
  userId: number;
  item: {
    productId: string;
    wishlistId: number;
  };
};

export type UpdateUserDetails = {
  city: string;
  country: string;
  mobile: string;
  postalCode: string;
  state: string;
  street: string;
  userName: string;
};

export type SendEmail = {
  email: string;
  subject: string;
  userName: string;
};
export type CartProductChangeType = {
  userId: number;
  productId: string;
  size: string;
  color: string;
  quantity?: number;
};
export type ProductsShowType = {
  id: string;
  title: string;
  card_image: string;
  price: number;
  amount: number;
  category: CategoriesType;
  available: boolean;
  hasDiscount: boolean;
  discount: number;
  colors: {
    available: number;
    color: string;
  }[];
  sizes: {
    available: number;
    size: string;
  }[];
};
