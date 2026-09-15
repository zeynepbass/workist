export default function postAdapter  (post)  {
    return{
        

    id: post._id,

    hizmetTuru: post.hizmetTuru,
    description: post.description,
    title: post.title,

    sure: post.sure,
    revizyon: post.revizyon,
    fiyat: post.fiyat,

    file: post.file,

    kodFiyatlandirma: {
        logo: post.kodFiyatlandirma?.logo ?? false,
        kaynakKod: post.kodFiyatlandirma?.kaynakKod ?? false,
        fonMuzigi: post.kodFiyatlandirma?.fonMuzigi ?? false,
    },

    ekstraOzellikler: {
        hizliTeslimat:
            post.ekstraOzellikler?.hizliTeslimat ?? false,

        fullHd:
            post.ekstraOzellikler?.fullHd ?? false,
    },

    selectedCategory: post.selectedCategory,
    selectedSubcategory: post.selectedSubcategory,

    userId: post.userId,
    kullaniciAd: post.kullaniciAd,

    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
}    };