export default function portfolioAdapter(portfolio) {
  if (!portfolio) return null;

  return {
    id: portfolio._id,
    title: portfolio.title,
    description: portfolio.description,
    status: portfolio.status,
    price: portfolio.price,
    image: portfolio.image,
    category: portfolio.category,
    subcategory: portfolio.subcategory,
    userId: portfolio.userId?.toString?.() ?? portfolio.userId,
    createdAt: portfolio.createdAt,
    updatedAt: portfolio.updatedAt,
  };
}
