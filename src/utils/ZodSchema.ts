import { z } from "zod";

// Register Schema
export const RegisterFormSchema = z
  .object({
    user_name: z
      .string()
      .trim()
      .min(3, { message: "Minimum characters for userName is 3 chars" })
      .max(50, { message: "Maximum characters for userName is 50 chars" }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .trim()
      .email({ message: "Please input a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(50, { message: "Password must be less than 50 chars" }),
    confirm_password: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((input) => input.password === input.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .trim()
    .email({ message: "Please input a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(50, { message: "Password must be less than 50 chars" }),
});

// Check out schema

export const checkoutSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .trim()
    .email({ message: "Please input a valid email" }),
  city: z.string().min(1, { message: "City is required" }).trim(),
  country: z.string().trim().min(1, { message: "City is required" }),
  mobile: z
    .string()
    .trim()
    .min(1, { message: "Mobile is required" })
    .min(10, { message: "Mobile must be at least 10 digits" })
    .max(15, { message: "Mobile cannot exceed 15 digits" }),

  postalCode: z
    .string()
    .trim()
    .min(1, { message: "Postal Code is required" })
    .min(5, { message: "Postal Code must be at least 5 characters" })
    .max(10, { message: "Postal Code cannot exceed 10 characters" }),

  state: z.string().trim().min(1, { message: "State is required" }),

  street: z
    .string()
    .trim()
    .min(1, { message: "Street is required" })
    .min(5, { message: "Street must be at least 5 characters" })
    .max(100, { message: "Street cannot exceed 100 characters" }),
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .min(4, { message: "Name must be at least 4 characters" })
    .max(100, { message: "Name cannot exceed 100 characters" }),
});
export type checkoutDataType = z.infer<typeof checkoutSchema>;

// User Setting
export const userSettingSchema = z.object({
  city: z
    .string({ message: "City is required" })
    .trim()
    .regex(/^[A-Za-z\s]+$/, {
      message: "City must contain only letters and spaces",
    }),

  country: z
    .string({ message: "Country is required" })
    .trim()
    .regex(/^[A-Za-z\s]+$/, {
      message: "Country must contain only letters and spaces",
    }),

  mobile: z
    .string({ message: "Mobile is required" })
    .trim()
    .regex(/^\d+$/, { message: "Mobile must contain only numbers" })
    .min(10, { message: "Mobile must be at least 10 digits" })
    .max(15, { message: "Mobile cannot exceed 15 digits" }),

  postalCode: z
    .string({ message: "Postal Code is required" })
    .trim()
    .regex(/^[A-Za-z0-9]+$/, { message: "Postal Code must be alphanumeric" })
    .min(5, { message: "Postal Code must be at least 5 characters" })
    .max(10, { message: "Postal Code cannot exceed 10 characters" }),

  state: z
    .string({ message: "State is required" })
    .trim()
    .regex(/^[A-Za-z\s]+$/, {
      message: "State must contain only letters and spaces",
    })
    .optional(),

  street: z
    .string({ message: "Street is required" })
    .trim()
    .min(5, { message: "Street must be at least 5 characters" })
    .max(100, { message: "Street cannot exceed 100 characters" }),
  userName: z
    .string({ message: "Name is required" })
    .trim()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(100, { message: "Name cannot exceed 100 characters" }),
});

// Email Schema
export const EmailSchema = z.object({
  email: z
    .string()
    .email({ message: "Please input a valid email" })
    .min(1, { message: "Email is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});
