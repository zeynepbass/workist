export const CATEGORIES = Object.freeze([
  {
    slug: "graphic-design",
    label: "Grafik & Tasarım",
    subcategories: [
      { slug: "logo-design", label: "Logo Tasarımı" },
      { slug: "poster-design", label: "Afiş Tasarımı" },
      { slug: "social-media-post", label: "Sosyal Medya Postu" },
    ],
  },
  {
    slug: "writing-translation",
    label: "Yazı & Çeviri",
    subcategories: [
      { slug: "article", label: "Makale" },
      { slug: "blog-post", label: "Blog Yazısı" },
      { slug: "book-translation", label: "Kitap Çevirisi" },
    ],
  },
  {
    slug: "software-technology",
    label: "Yazılım & Teknoloji",
    subcategories: [
      { slug: "web-application", label: "Web Uygulaması" },
      { slug: "mobile-application", label: "Mobil Uygulama" },
      { slug: "api-development", label: "API Geliştirme" },
    ],
  },
]);

const ALL_SUBCATEGORIES = CATEGORIES.flatMap((category) => category.subcategories);

export function findSubcategorySlugsByLabel(term) {
  const normalizedTerm = term.toLocaleLowerCase("tr-TR");

  return ALL_SUBCATEGORIES.filter((subcategory) =>
    subcategory.label.toLocaleLowerCase("tr-TR").includes(normalizedTerm),
  ).map((subcategory) => subcategory.slug);
}
