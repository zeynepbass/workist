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

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {})
    .catch((err) => {});

io.on('connection', (socket) => {
  socket.on('sendMessage', async (data) => {
    try {
      const yeniMesaj = new Mesaj(data);
      await yeniMesaj.save();

      io.emit('receiveMessage', yeniMesaj);
    } catch (err) {
    }
  });

  socket.on('disconnect', () => {
  });
});

const PORT = process.env.PORT || 5430;
server.listen(PORT, () => {});
