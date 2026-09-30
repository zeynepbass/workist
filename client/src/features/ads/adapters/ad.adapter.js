import { publicUserAdapter } from "@/features/auth/adapters/user.adapter";

export default function adAdapter(ad) {
  return {
    id: ad.id,
    ownerId: ad.ownerId,
    owner: publicUserAdapter(ad.owner),
    serviceType: ad.serviceType,
    title: ad.title,
    description: ad.description,
    deliveryTime: ad.deliveryTime,
    revisionCount: ad.revisionCount,
    price: ad.price,
    imageUrl: ad.imageUrl,
    addons: ad.addons,
    extras: ad.extras,
    category: ad.category,
    subcategory: ad.subcategory,
    rating: ad.rating ?? { average: 0, count: 0 },
    createdAt: ad.createdAt,
  };
}
