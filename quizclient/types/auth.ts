import * as z from "zod";

export const registerFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(4),
  name: z.string(),
});

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(4),
});

export const otpSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
})

export const verifyEmailSchema = z.object({
  token: z.string(),
  code: z.string(),
});
