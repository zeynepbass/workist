const INDEX_NAME = "email_1";

const normalizedEmail = { $toLower: { $trim: { input: "$email" } } };

async function findDuplicateEmails(users) {
  return users
    .aggregate([
      { $group: { _id: normalizedEmail, count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
    ])
    .toArray();
}

export const up = async (db) => {
  const users = db.collection("users");
  const duplicates = await findDuplicateEmails(users);

  if (duplicates.length > 0) {
    const emails = duplicates.map((duplicate) => duplicate._id).join(", ");
    throw new Error(`Resolve duplicate user emails before migrating: ${emails}`);
  }

  await users.updateMany({}, [{ $set: { email: normalizedEmail } }]);
  await users.createIndex({ email: 1 }, { unique: true, name: INDEX_NAME });
};

export const down = async (db) => {
  const indexes = await db.collection("users").indexes();

  if (indexes.some((index) => index.name === INDEX_NAME)) {
    await db.collection("users").dropIndex(INDEX_NAME);
  }
};
