import mongoose from "mongoose";

import Portfolio from "../models/portfolio.model.js";

export const listMyPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.user._id });
    return res.status(200).json(portfolios);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.create({ ...req.body, userId: req.user._id });
    return res.status(201).json(portfolio);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const deletePortfolio = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Geçersiz ID");
  }

  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(id);

    if (!deletedPortfolio) {
      return res.status(404).json({ message: "Portfolyo bulunamadı" });
    }

    return res.status(200).json({ message: "Portfolyo başarıyla silindi" });
  } catch {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePortfolio = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Portfolyo bulunamadı");
  }

  const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, req.body, { new: true });
  return res.status(200).json(updatedPortfolio);
};

export const updatePortfolioStatus = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
    );

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolyo bulunamadı." });
    }

    return res.status(200).json(portfolio);
  } catch (error) {
    return res.status(500).json({
      message: "Portfolyo durumu güncellenemedi.",
      error: error.message,
    });
  }
};
