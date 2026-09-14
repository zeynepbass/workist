export const portfoliAdapter = (item) => ({
    id: item._id,
    description: item.description,
    title: item.title,
    durum: item.durum,
    fiyat: item.fiyat,
    file: item.file,
    selectedCategory: item.selectedCategory,
    selectedSubcategory: item.selectedSubcategory,
    userId: item.userId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
});