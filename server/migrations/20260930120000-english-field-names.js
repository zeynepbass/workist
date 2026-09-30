const COLLECTION_RENAMES = [
  ["ilanlarims", "ads"],
  ["portfolyos", "portfolios"],
];

const FIELD_RENAMES = {
  ads: [
    {
      hizmetTuru: "serviceType",
      sure: "deliveryTime",
      revizyon: "revisionCount",
      fiyat: "price",
      file: "image",
      kodFiyatlandirma: "addons",
      ekstraOzellikler: "extras",
      selectedCategory: "category",
      selectedSubcategory: "subcategory",
      kullaniciAd: "ownerName",
    },
    {
      "addons.kaynakKod": "addons.sourceCode",
      "addons.fonMuzigi": "addons.backgroundMusic",
      "extras.hizliTeslimat": "extras.fastDelivery",
    },
  ],
  portfolios: [
    {
      durum: "status",
      fiyat: "price",
      file: "image",
      selectedCategory: "category",
      selectedSubcategory: "subcategory",
    },
  ],
  users: [
    {
      tel: "phone",
      hakkimda: "about",
      file: "avatar",
      uzmanlik: "skills",
      sertifika: "certificates",
      unvan: "title",
    },
  ],
  messages: [{ gonderenId: "senderId", aliciId: "recipientId", time: "sentAt" }],
};

const invert = (mapping) => Object.fromEntries(Object.entries(mapping).map(([a, b]) => [b, a]));

async function collectionExists(db, name) {
  const matches = await db.listCollections({ name }, { nameOnly: true }).toArray();
  return matches.length > 0;
}

async function renameCollection(db, from, to) {
  if (!(await collectionExists(db, from))) {
    return;
  }

  if (await collectionExists(db, to)) {
    const targetCount = await db.collection(to).countDocuments();

    if (targetCount > 0) {
      throw new Error(`Cannot rename "${from}" to "${to}": target collection is not empty`);
    }

    await db.collection(to).drop();
  }

  await db.collection(from).rename(to);
}

async function renameFields(db, collection, steps) {
  for (const mapping of steps) {
    await db.collection(collection).updateMany({}, { $rename: mapping });
  }
}

export const up = async (db) => {
  for (const [from, to] of COLLECTION_RENAMES) {
    await renameCollection(db, from, to);
  }

  for (const [collection, steps] of Object.entries(FIELD_RENAMES)) {
    await renameFields(db, collection, steps);
  }

  const portfolios = db.collection("portfolios");
  await portfolios.updateMany({ status: "yayinda" }, { $set: { status: "published" } });
  await portfolios.updateMany(
    { status: { $exists: true, $ne: "published" } },
    { $set: { status: "unpublished" } },
  );

  await db.collection("users").updateMany({}, { $unset: { selectedFile: "", id: "" } });
};

export const down = async (db) => {
  const portfolios = db.collection("portfolios");
  await portfolios.updateMany({ status: "unpublished" }, { $set: { status: "yayindaDegil" } });
  await portfolios.updateMany({ status: "published" }, { $set: { status: "yayinda" } });

  for (const [collection, steps] of Object.entries(FIELD_RENAMES)) {
    await renameFields(db, collection, [...steps].reverse().map(invert));
  }

  for (const [from, to] of [...COLLECTION_RENAMES].reverse()) {
    await renameCollection(db, to, from);
  }
};
