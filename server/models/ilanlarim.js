import mongoose from 'mongoose';

const ilanlarimSchema = new mongoose.Schema({
  hizmetTuru: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  sure: {
    type: String,
    required: true,
  },
  revizyon:{
    type: Number,
    required: true,
  },
  fiyat:{
    type: Number,
    required: true,
  },
  file: {
    type: String,
    required: true
  },
  kodFiyatlandirma: {
    logo: { type: Boolean, default: false },
    kaynakKod: { type: Boolean, default: false },
    fonMuzigi: { type: Boolean, default: false },
  },
  ekstraOzellikler: {
    hizliTeslimat: { type: Boolean, default: false },
    fullHd: { type: Boolean, default: false },
  },
  selectedCategory: {
    type: String,
    required: true,
  },
  selectedSubcategory: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  kullaniciAd: {
    type: String,
    required: true
  }
  
}, { timestamps: true });

export default mongoose.model('Ilanlarim', ilanlarimSchema);
