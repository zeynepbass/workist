import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_BYTES = 72;

export const password = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Parola en az ${PASSWORD_MIN_LENGTH} karakter olmalı.`)
  .refine((value) => Buffer.byteLength(value, "utf8") <= PASSWORD_MAX_BYTES, "Parola çok uzun.");

const email = z
  .email("Geçerli bir e-posta girin.")
  .max(254)
  .transform((value) => value.toLowerCase());
const name = z.string().trim().min(1, "Bu alan zorunlu.").max(50);

export const registerBody = z
  .strictObject({
    email,
    password,
    confirmPassword: z.string(),
    firstName: name,
    lastName: name,
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Parolalar uyuşmuyor.",
  });

export const loginBody = z.strictObject({
  email,
  password: z.string().min(1).max(200),
});
