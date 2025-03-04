"use server";
import prisma from "@/utils/PrismaVariable";

export const OverviewAdminNumbers = async () => {
  const products = await prisma.product.count();
  const orders = await prisma.order.count();
  const users = await prisma.user.count();
  const categories = await prisma.category.count();

  return {
    total_products: products,
    total_orders: orders,
    total_users: users,
    total_categories: categories,
  };
};
