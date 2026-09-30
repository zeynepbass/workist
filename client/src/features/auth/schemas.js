import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 8;

const email = z.email("Geçerli bir e-posta girin.").max(254);
const password = z.string().min(PASSWORD_MIN_LENGTH, `Parola en az ${PASSWORD_MIN_LENGTH} karakter olmalı.`);
const name = z.string().trim().min(1, "Bu alan zorunlu.").max(50, "En fazla 50 karakter.");

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Parolanızı girin."),
});

export const registerSchema = z
  .object({ firstName: name, lastName: name, email, password, confirmPassword: z.string() })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Parolalar uyuşmuyor.",
  });

export const profileSchema = z.object({
  firstName: name,
  lastName: name,
  title: z.string().trim().max(80, "En fazla 80 karakter."),
  about: z.string().max(1000, "En fazla 1000 karakter."),
});

export const contactSchema = z.object({
  phone: z.string().trim().max(30, "En fazla 30 karakter."),
});

export const changePasswordSchema = z
  .object({ currentPassword: z.string().min(1, "Mevcut parolanızı girin."), newPassword: password })
  .refine((value) => value.currentPassword !== value.newPassword, {
    path: ["newPassword"],
    message: "Yeni parola mevcut parolayla aynı olamaz.",
  });

export const SKILL_LIMIT = 6;
export const CERTIFICATE_LIMIT = 5;
