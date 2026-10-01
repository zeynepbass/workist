import { publicUserAdapter } from "@/features/auth/adapters/user.adapter";

export default function portfolioAdapter(portfolio) {
  return {
    id: portfolio.id,
    ownerId: portfolio.ownerId,
    owner: publicUserAdapter(portfolio.owner),
    title: portfolio.title,
    description: portfolio.description,
    status: portfolio.status,
    price: portfolio.price,
    imageUrl: portfolio.imageUrl,
    category: portfolio.category,
    subcategory: portfolio.subcategory,
    createdAt: portfolio.createdAt,
  };
}
