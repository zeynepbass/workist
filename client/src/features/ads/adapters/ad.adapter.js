export default function adAdapter(ad) {
  if (!ad) return null;

  return {
    id: ad._id,
    serviceType: ad.serviceType,
    title: ad.title,
    description: ad.description,
    deliveryTime: ad.deliveryTime,
    revisionCount: ad.revisionCount,
    price: ad.price,
    image: ad.image,
    addons: {
      logo: ad.addons?.logo ?? false,
      sourceCode: ad.addons?.sourceCode ?? false,
      backgroundMusic: ad.addons?.backgroundMusic ?? false,
    },
    extras: {
      fastDelivery: ad.extras?.fastDelivery ?? false,
      fullHd: ad.extras?.fullHd ?? false,
    },
    category: ad.category,
    subcategory: ad.subcategory,
    userId: ad.userId?.toString?.() ?? ad.userId,
    ownerName: ad.ownerName,
    createdAt: ad.createdAt,
    updatedAt: ad.updatedAt,
  };
}
