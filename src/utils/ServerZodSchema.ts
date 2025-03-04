import { z } from "zod";

// Register Schema
export const RegisterServerSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .trim()
    .min(3, { message: "Minimum chars for userName is 3 chars" })
    .max(50, { message: "Maximum chars for userName is 50 chars" }),

  email: z
    .string({ message: "Email is required" })
    .trim()
    .email({ message: "Please input a valid email" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be more than 8 chars" })
    .max(50, { message: "Password must be less than 50 chars" }),
});

// Update Product Schema

export const ProductInfoForEditSchema = z.object({
  id: z.string(),
  title: z.string(),
  available: z.boolean(),
  description: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  brandName: z.string(),
  card_image: z.string(),
  colors: z.array(
    z.object({
      available: z.number(),
      color: z.string(),
    })
  ),
  hasDiscount: z.boolean(),
  discount: z.number(),
  sizes: z.array(
    z.object({
      available: z.number(),
      size: z.string(),
    })
  ),
  amount: z.number(),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  comments: z.array(
    z.object({
      id: z.number(),
      content: z.string(),
      rating: z.number(),
      created_at: z.string(),
      user: z.object({
        id: z.number(),
        username: z.string(),
      }),
    })
  ),
});
