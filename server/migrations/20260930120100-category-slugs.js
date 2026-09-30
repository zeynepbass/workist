const CATEGORY_SLUGS = {
  "Grafik & Tasarım": "graphic-design",
  "Yazı & Çeviri": "writing-translation",
  "Yazılım & Teknoloji": "software-technology",
};

const SUBCATEGORY_SLUGS = {
  "Logo Tasarımı": "logo-design",
  "Afiş Tasarımı": "poster-design",
  "Sosyal Medya Postu": "social-media-post",
  Makale: "article",
  "Blog Yazısı": "blog-post",
  "Kitap Çevirisi": "book-translation",
  "Web Uygulaması": "web-application",
  "Mobil Uygulama": "mobile-application",
  "API Geliştirme": "api-development",
};

const COLLECTIONS = ["ads", "portfolios"];

async function replaceValues(db, field, mapping) {
  for (const collection of COLLECTIONS) {
    for (const [from, to] of Object.entries(mapping)) {
      await db.collection(collection).updateMany({ [field]: from }, { $set: { [field]: to } });
    }
  }
}

const invert = (mapping) => Object.fromEntries(Object.entries(mapping).map(([a, b]) => [b, a]));

export const up = async (db) => {
  await replaceValues(db, "category", CATEGORY_SLUGS);
  await replaceValues(db, "subcategory", SUBCATEGORY_SLUGS);
};

export const down = async (db) => {
  await replaceValues(db, "category", invert(CATEGORY_SLUGS));
  await replaceValues(db, "subcategory", invert(SUBCATEGORY_SLUGS));
};
