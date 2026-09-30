import mongoose from "mongoose";

import Ad from "../models/ad.model.js";
import { findSubcategorySlugsByLabel } from "../constants/categories.js";
import { escapeRegex } from "../utils/escapeRegex.js";

function buildSearchFilter({ search, subcategory }) {
  if (subcategory) {
    return { subcategory: String(subcategory) };
  }

  if (!search) {
    return {};
  }

  const term = String(search);
  const pattern = new RegExp(escapeRegex(term), "i");

  return {
    $or: [
      { serviceType: pattern },
      { title: pattern },
      { subcategory: { $in: findSubcategorySlugsByLabel(term) } },
    ],
  };
}

export const listAds = async (req, res) => {
  try {
    const ads = await Ad.find(buildSearchFilter(req.query));
    res.status(200).json(ads);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const listMyAds = async (req, res) => {
  try {
    const ads = await Ad.find({ userId: req.user._id });
    return res.status(200).json(ads);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createAd = async (req, res) => {
  try {
    const ad = await Ad.create(req.body);
    res.status(201).json(ad);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteAd = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Geçersiz ID");
  }

  try {
    const deletedAd = await Ad.findByIdAndDelete(id);

    if (!deletedAd) {
      return res.status(404).json({ message: "İlan bulunamadı" });
    }

    return res.status(200).json({ message: "İlan başarıyla silindi" });
  } catch {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

export const getAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    res.status(200).json(ad);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateAd = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("İlan bulunamadı");
  }

  const updatedAd = await Ad.findByIdAndUpdate(id, req.body, { new: true });
  return res.status(200).json(updatedAd);
};
