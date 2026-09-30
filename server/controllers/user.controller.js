import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import env from "../config/env.js";
import User from "../models/user.model.js";

const PASSWORD_SALT_ROUNDS = 12;

function signToken(user, expiresIn) {
  return jwt.sign({ _id: user._id, email: user.email }, env.JWT_SECRET, { expiresIn });
}

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    return res.status(200).json(user);
  } catch {
    return res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({ error: "Kullanıcılar getirilemedi" });
  }
};

export const listOtherUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select(
      "firstName lastName avatar",
    );
    res.json(users);
  } catch {
    res.status(500).json({ error: "Kullanıcılar bulunamadı" });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: normalizeEmail(req.params.email) });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: normalizeEmail(req.params.email) });

    if (!user) {
      return res.status(404).send("Kullanıcı bulunamadı");
    }

    Object.assign(user, req.body);

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, PASSWORD_SALT_ROUNDS);
    }

    const updatedUser = await user.save();
    return res.status(200).json(updatedUser);
  } catch {
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: normalizeEmail(req.params.email) });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    await User.findByIdAndDelete(user._id);
    return res.status(200).json({ message: "Kullanıcı silindi" });
  } catch {
    return res.status(500).json({ message: "Bir hata oluştu" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: "E-posta ve parola zorunludur." });
  }

  try {
    const user = await User.findOne({ email: normalizeEmail(email) });

    if (!user) {
      return res.status(404).json({ message: "Bu e-posta adresine kayıtlı kullanıcı bulunamadı." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "E-posta veya parola hatalı." });
    }

    return res.status(200).json({
      result: user,
      token: signToken(user, "1d"),
      message: "Giriş başarılı.",
    });
  } catch {
    return res.status(500).json({ message: "Giriş sırasında bir hata oluştu." });
  }
};

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body ?? {};

  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    return res.status(400).json({ message: "Tüm alanları doldurunuz." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Parolalar uyuşmuyor." });
  }

  try {
    const normalizedEmail = normalizeEmail(email);
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({ message: "Bu e-posta adresi zaten kayıtlı." });
    }

    const user = await User.create({
      email: normalizedEmail,
      password: await bcrypt.hash(password, PASSWORD_SALT_ROUNDS),
      firstName,
      lastName,
    });

    return res.status(201).json({
      result: user,
      token: signToken(user, "30d"),
      message: "Kayıt başarılı.",
    });
  } catch {
    return res.status(500).json({ message: "Kayıt sırasında bir hata oluştu." });
  }
};
