import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import portfolyo from './routes/portfolyo.js';
import ilanlarim from './routes/ilanlarim.js';
import kullanici from './routes/kullanici.js';
import message from './routes/message.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Mesaj from './models/message.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    credentials: true
  },
});

app.use(cors());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));


app.use('/', portfolyo);
app.use('/', ilanlarim);
app.use('/', kullanici);
app.use('/', message);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB bağlantısı kuruldu'))
.catch((err) => console.log('❌ Bağlantı hatası:', err));


io.on('connection', (socket) => {
  console.log('🔌 Yeni bağlantı:', socket.id);

  socket.on('sendMessage', async (data) => {
    try {
      const yeniMesaj = new Mesaj(data);
      await yeniMesaj.save();

      console.log('📩 Yeni mesaj alındı ve kaydedildi:', yeniMesaj);

      io.emit('receiveMessage', yeniMesaj);
    } catch (err) {
      console.error('❌ Mesaj gönderilirken hata:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ Kullanıcı ayrıldı:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});
