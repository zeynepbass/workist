import { readFile } from "node:fs/promises";

import bcrypt from "bcrypt";
import mongoose from "mongoose";

import env from "../config/env.js";
import logger from "../config/logger.js";
import Ad from "../models/ad.model.js";
import Message from "../models/message.model.js";
import Order from "../models/order.model.js";
import Portfolio from "../models/portfolio.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import { storeImage } from "../services/file.service.js";

export const DEMO_PASSWORD = "Workist123!";

const DEMO_USERS = {
  seller: {
    email: "demo.satici@workist.dev",
    firstName: "Deniz",
    lastName: "Yılmaz",
    title: "Full-stack Geliştirici",
    about: "Web uygulamaları ve yönetim panelleri geliştiriyorum.",
    skills: ["React", "Node.js", "MongoDB"],
  },
  buyer: {
    email: "demo.alici@workist.dev",
    firstName: "Ece",
    lastName: "Kaya",
    title: "Ürün Yöneticisi",
  },
};

const DEMO_ADS = [
  {
    asset: "software.png",
    serviceType: "Admin Panel",
    title: "Ben, işletmeniz için yönetim paneli geliştiririm",
    description: "React ve Node.js ile rol tabanlı, raporlamalı yönetim paneli.",
    deliveryTime: "7 gün",
    revisionCount: 2,
    price: 2500,
    category: "software-technology",
    subcategory: "web-application",
    addons: { sourceCode: true },
  },
  {
    asset: "design.png",
    serviceType: "Özel kodlanmış web tasarımı",
    title: "Ben, markanıza özel logo tasarlarım",
    description: "Üç farklı konsept ve vektörel teslim dosyaları.",
    deliveryTime: "3 gün",
    revisionCount: 3,
    price: 900,
    category: "graphic-design",
    subcategory: "logo-design",
    addons: { logo: true },
  },
  {
    asset: "writing.png",
    serviceType: "Hata Giderme",
    title: "Ben, teknik blog yazıları hazırlarım",
    description: "SEO uyumlu, kaynaklı ve özgün teknik içerikler.",
    deliveryTime: "2 gün",
    revisionCount: 1,
    price: 400,
    category: "writing-translation",
    subcategory: "blog-post",
  },
];

async function imageFile(name) {
  return { buffer: await readFile(new URL(`./seed-assets/${name}`, import.meta.url)) };
}

async function createUser(profile) {
  return User.create({ ...profile, password: await bcrypt.hash(DEMO_PASSWORD, 12) });
}

async function removeDemoData() {
  const users = await User.find({ email: { $in: Object.values(DEMO_USERS).map((user) => user.email) } });
  const ids = users.map((user) => user._id);

  await Promise.all([
    Ad.deleteMany({ owner: { $in: ids } }),
    Portfolio.deleteMany({ owner: { $in: ids } }),
    Order.deleteMany({ $or: [{ buyer: { $in: ids } }, { seller: { $in: ids } }] }),
    Review.deleteMany({ $or: [{ reviewer: { $in: ids } }, { seller: { $in: ids } }] }),
    Message.deleteMany({ $or: [{ sender: { $in: ids } }, { recipient: { $in: ids } }] }),
    User.deleteMany({ _id: { $in: ids } }),
  ]);
}

async function seedCompletedOrder({ seller, buyer, ad }) {
  const now = Date.now();
  const order = await Order.create({
    ad: ad._id,
    adTitle: ad.title,
    buyer: buyer._id,
    seller: seller._id,
    status: "completed",
    requirements: "Kafe markamız için sade ve modern bir logo istiyoruz.",
    offer: { price: ad.price, deliveryDays: 3, note: "Üç konsept sunacağım." },
    dueAt: new Date(now + 3 * 86_400_000),
    revisionLimit: ad.revisionCount,
    reviewed: true,
    events: [
      { action: "create", actor: buyer._id, toStatus: "requested" },
      { action: "offer", actor: seller._id, fromStatus: "requested", toStatus: "offered" },
      { action: "accept", actor: buyer._id, fromStatus: "offered", toStatus: "active" },
      { action: "deliver", actor: seller._id, fromStatus: "active", toStatus: "delivered" },
      { action: "complete", actor: buyer._id, fromStatus: "delivered", toStatus: "completed" },
    ],
    deliveries: [{ note: "Logo dosyaları ektedir." }],
  });

  await Review.create({
    order: order._id,
    ad: ad._id,
    reviewer: buyer._id,
    seller: seller._id,
    rating: 5,
    comment: "Hızlı ve çok özenli bir çalışma oldu, teşekkürler!",
  });

  await Ad.updateOne({ _id: ad._id }, { rating: { average: 5, count: 1 } });
  await User.updateOne({ _id: seller._id }, { rating: { average: 5, count: 1 } });
}

export async function seed() {
  await removeDemoData();

  const seller = await createUser(DEMO_USERS.seller);
  const buyer = await createUser(DEMO_USERS.buyer);

  const ads = [];
  for (const { asset, ...fields } of DEMO_ADS) {
    const imageKey = await storeImage(await imageFile(asset), { folder: "ads", ownerId: seller._id });
    ads.push(await Ad.create({ ...fields, owner: seller._id, imageKey }));
  }

  await Portfolio.create({
    owner: seller._id,
    title: "E-ticaret yönetim paneli",
    description: "Bir butik için stok ve sipariş yönetimi paneli geliştirdim.",
    price: 3000,
    status: "published",
    category: "software-technology",
    subcategory: "web-application",
    imageKey: await storeImage(await imageFile("software.png"), { folder: "portfolios", ownerId: seller._id }),
  });

  await seedCompletedOrder({ seller, buyer, ad: ads[1] });

  await Message.create([
    { sender: buyer._id, recipient: seller._id, text: "Merhaba, yönetim paneli için bilgi alabilir miyim?" },
    { sender: seller._id, recipient: buyer._id, text: "Tabii, ihtiyaçlarınızı sipariş talebinde yazabilirsiniz." },
  ]);

  return { seller, buyer };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  mongoose
    .connect(env.MONGO_URI)
    .then(seed)
    .then(() =>
      logger.info(
        { accounts: Object.values(DEMO_USERS).map((user) => user.email), password: DEMO_PASSWORD },
        "Demo data ready",
      ),
    )
    .catch((error) => {
      logger.error({ err: error }, "Seeding failed");
      process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
}
