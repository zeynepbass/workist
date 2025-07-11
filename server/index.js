import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import portfolyo from './routes/portfolyo.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ilanlarim from './routes/ilanlarim.js';
import kullanici from './routes/kullanici.js';
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

app.use(cors());

app.use('/', portfolyo);
app.use('/', ilanlarim);
app.use('/', kullanici);
app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database bağlantısı kuruldu"))
  .catch((err) => console.log(err));
});

