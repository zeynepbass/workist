export const orderDetail = {
    id: "0",

    alici: "Ali Veli",

    siparisTarihi: "2023-08-01",

    teslimTarihi: "2023-08-10",

    durum: "devam",

    ilan: "Web Tasarım Paketi",

    paket: {
        adet: 1,
        sure: "5 gün",
        tutar: 500,
    },

    degerlendirme: {
        kullaniciAdi: "ali_veli",
        aciklama: "Hızlı ve kaliteli hizmet, teşekkürler!",
    },

    process: [
        {
            type: "completed",
            title: "Sipariş tamamlandı. 🥳",
            description: "Ödemen Bionluk Bakiyene aktarılacak.",
            time: "23:42",
        },
        {
            type: "delivered",
            title: "Sipariş teslim edildi. 👏",
            description:
                "Alıcının siparişi inceleyip onay veya revize vermesi bekleniyor.",
            time: "23:41",
        },
        {
            type: "support",
            title: "Çözüm Merkezi",
            description:
                'Bir sorun yaşarsan bize "Çözüm Merkezi" bölümünden yazabilirsin.',
            time: "16:38",
        },
        {
            type: "started",
            title: "Sipariş başladı",
            description:
                "Sipariş süreci başladı. Şimdi freelancer’ın işi teslim etmesi bekleniyor.",
            time: "16:38",
        },
        {
            type: "new-order",
            title: "Yeni bir sipariş aldın!",
            description: "Ödeme şu an havuz hesabında.",
            time: "16:38",
        },
    ],
};