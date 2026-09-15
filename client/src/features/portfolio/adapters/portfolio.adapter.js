export default function portfoliAdapter (item){
    return{


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
}    }