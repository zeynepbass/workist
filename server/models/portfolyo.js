import mongoose from 'mongoose';

const portoflyoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  durum: {
    type: String,
    default: "yayinda"
  },
  fiyat: {
    type: Number,
    required: true,
  },
  file: {
    type: String,
    required: true,
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
  }
}, { timestamps: true });

export default mongoose.model('Portfolyo', portoflyoSchema);
