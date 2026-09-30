import { z } from "zod";

import { password } from "./auth.validators.js";

const tag = z.string().trim().min(1).max(60);

export const updateProfileBody = z
  .strictObject({
    firstName: z.string().trim().min(1).max(50),
    lastName: z.string().trim().min(1).max(50),
    phone: z.string().trim().max(30),
    about: z.string().max(1000),
    title: z.string().trim().max(80),
    skills: z.array(tag).max(6),
    certificates: z.array(tag).max(5),
  })
  .partial();

export const changePasswordBody = z
  .strictObject({ currentPassword: z.string().min(1), newPassword: password })
  .refine((value) => value.currentPassword !== value.newPassword, {
    path: ["newPassword"],
    message: "Yeni parola mevcut parolayla aynı olamaz.",
  });

export const deleteAccountBody = z.strictObject({ password: z.string().min(1) });
