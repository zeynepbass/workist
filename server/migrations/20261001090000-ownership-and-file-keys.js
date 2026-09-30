const RENAMES = {
  ads: { userId: "owner", image: "imageKey" },
  portfolios: { userId: "owner", image: "imageKey" },
  users: { avatar: "avatarKey" },
  messages: { senderId: "sender", recipientId: "recipient" },
};

const invert = (mapping) => Object.fromEntries(Object.entries(mapping).map(([a, b]) => [b, a]));

export const up = async (db) => {
  for (const [collection, mapping] of Object.entries(RENAMES)) {
    await db.collection(collection).updateMany({}, { $rename: mapping });
  }

  await db.collection("ads").updateMany({}, { $unset: { ownerName: "" } });
};

export const down = async (db) => {
  for (const [collection, mapping] of Object.entries(RENAMES)) {
    await db.collection(collection).updateMany({}, { $rename: invert(mapping) });
  }
};
