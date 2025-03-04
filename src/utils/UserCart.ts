import { MainDomain } from "./mainDomain";

export const FetchUserCart = async (userId: number) => {
  const res = await fetch(`${MainDomain}/api/user/cart?userId=${userId}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};
