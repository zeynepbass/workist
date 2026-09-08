export const adsAdapter = (ilan) => {
    if (!ilan) return null;

    return {
        id: ilan._id,

        hizmetTuru: ilan.hizmetTuru,
        description: ilan.description,
        title: ilan.title,
        sure: ilan.sure,
        revizyon: ilan.revizyon,
        fiyat: ilan.fiyat,
        file: ilan.file,

        kodFiyatlandirma: {
            logo: ilan.kodFiyatlandirma?.logo ?? false,
            kaynakKod: ilan.kodFiyatlandirma?.kaynakKod ?? false,
            fonMuzigi: ilan.kodFiyatlandirma?.fonMuzigi ?? false,
        },

        ekstraOzellikler: {
            hizliTeslimat:
                ilan.ekstraOzellikler?.hizliTeslimat ?? false,

            fullHd:
                ilan.ekstraOzellikler?.fullHd ?? false,
        },

        selectedCategory: ilan.selectedCategory,
        selectedSubcategory: ilan.selectedSubcategory,

        userId: ilan.userId?.toString?.() ?? ilan.userId,

        kullaniciAd: ilan.kullaniciAd,

        createdAt: ilan.createdAt,
        updatedAt: ilan.updatedAt,
    };
};