import { ProductCardType } from "@/utils/Types";
import { create } from "zustand";

export type OrderType = {
  id: number;
  status: "PENDING" | "COMPLETED" | "CANCELED" | "SHIPPED";
  totalAmount: number;
  created_at: string;
  items: {
    id: number;
    product: ProductCardType;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
};

export type userDetailsType = {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
  city: string | null;
  mobile: string | null;
  postalCode: string | null;
  state: string | null;
  street: string | null;
  country: string | null;
  orders: OrderType[];
} | null;

interface UserStre {
  userDetails: userDetailsType;
  UpdateUserDetails: (user: userDetailsType) => void;
}

export const useUserDetailsStore = create<UserStre>((set) => ({
  userDetails: null,
  UpdateUserDetails: (user) => set(() => ({ userDetails: user })),
}));
