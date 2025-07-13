import mongoose from 'mongoose';

const mesajSchema = new mongoose.Schema({
  gonderenId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  aliciId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  time: { type: Date, default: Date.now }
});

export default mongoose.model('Message', mesajSchema);
