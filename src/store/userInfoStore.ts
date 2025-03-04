import { create } from "zustand";
export type CartItemType = {
  id: number;
  quantity: number;
  product: {
    id: string;
    title: string;
    card_image: string;
    price: number;
    available: boolean;
    hasDiscount: boolean;
    discount?: number;
    colors: {
      color: string;
      available: number;
    }[];
    sizes: {
      size: string;
      available: number;
    }[];
  };
  color: string;
  size: string;
};

export type UserInfoType = {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
  cart: {
    id: number;
    items: CartItemType[];
  };
  wishList: {
    id: number;
    items: {
      id: number;
      product: {
        id: string;
      };
    }[];
  };
  city: string;
  country: string;
  mobile: string;
  state: string;
  postalCode: string;
  street: string;
} | null;

interface UserStre {
  userInfo: UserInfoType;
  UpdateUserInfo: (user: UserInfoType) => void;
  AddToWishList: (newItem: string) => void;
  RemoveFromWishList: (itmeId: number) => void;
  AddToCart: (newProduct: CartItemType) => void;
  RemoveFromCart: (productId: string, color: string, size: string) => void;
  ChangeQuantity: (
    productId: string,
    color: string,
    size: string,
    operation: "up" | "down"
  ) => void;
}

export const useUserStore = create<UserStre>((set) => ({
  userInfo: null,

  UpdateUserInfo: (user) => set(() => ({ userInfo: user })),
  // WishList
  AddToWishList: (newItem) =>
    set((state) => {
      if (!state.userInfo) return state;

      const currentItems = state.userInfo.wishList.items || [];
      const lastItemId = currentItems.length
        ? currentItems[currentItems.length - 1].id
        : 0;

      return {
        userInfo: {
          ...state.userInfo,
          wishList: {
            id: state.userInfo.wishList.id,
            items: [
              ...currentItems,
              {
                id: lastItemId + 1,
                product: {
                  id: newItem,
                },
              },
            ],
          },
        },
      };
    }),
  RemoveFromWishList: (itmeId: number) =>
    set((state) => {
      if (!state.userInfo) {
        return state;
      }
      const newItems = state.userInfo.wishList.items.filter(
        (itm) => itm.id != itmeId
      );
      return {
        userInfo: {
          ...state.userInfo,
          wishList: {
            id: state.userInfo.id,
            items: newItems,
          },
        },
      };
    }),

  // Cart

  AddToCart: (newProduct: CartItemType) =>
    set((state) => {
      if (!state.userInfo) return state;

      const ExistIndex = state.userInfo.cart.items.findIndex(
        (c) =>
          c.product.id == newProduct.product.id &&
          c.color == newProduct.color &&
          c.size == newProduct.size
      );
      // If product Exist
      if (ExistIndex != -1) {
        const ExistItems = state.userInfo.cart.items;
        const newItems = ExistItems.map((itm, i) => {
          if (i == ExistIndex) {
            return { ...itm, quantity: itm.quantity + 1 };
          }
          return itm;
        });
        return {
          userInfo: {
            ...state.userInfo,
            cart: {
              id: state.userInfo.cart.id,
              items: newItems,
            },
          },
        };
      }
      const newId =
        state.userInfo.cart.items.length > 0
          ? Math.max(...state.userInfo.cart.items.map((item) => item.id)) + 1
          : 1;
      return {
        userInfo: {
          ...state.userInfo,
          cart: {
            id: state.userInfo.cart.id,
            items: [
              ...state.userInfo.cart.items,
              {
                id: newId,
                color: newProduct.color,
                size: newProduct.size,
                product: newProduct.product,
                quantity: newProduct.quantity,
              },
            ],
          },
        },
      };
    }),

  RemoveFromCart: (productId: string, color: string, size: string) =>
    set((state) => {
      if (!state.userInfo) return state;
      const item = state.userInfo.cart.items.find(
        (itm) =>
          itm.product.id == productId && color == itm.color && size == itm.size
      );
      if (!item) {
        console.warn("Item not found in cart");
        return state;
      }
      const newItems = state.userInfo.cart.items.filter(
        (itm) => itm.id != item.id
      );
      return {
        userInfo: {
          ...state.userInfo,
          cart: {
            id: state.userInfo.cart.id,
            items: newItems,
          },
        },
      };
    }),

  ChangeQuantity: (productId, color, size, operation) =>
    set((state) => {
      if (!state.userInfo) return state;

      const item = state.userInfo.cart.items.find(
        (itm) =>
          itm.product.id == productId && color == itm.color && size == itm.size
      );
      if (!item) {
        console.warn("Item not found in cart");
        return state;
      }
      const change = operation == "up" ? 1 : -1;
      const newItems = state.userInfo.cart.items.map((it) => {
        if (it.id == item.id) {
          return {
            ...it,
            quantity: it.quantity + change,
          };
        }
        return it;
      });

      return {
        userInfo: {
          ...state.userInfo,
          cart: {
            id: state.userInfo.cart.id,
            items: newItems,
          },
        },
      };
    }),
}));
