export default function OrderReview  ({ review })  {
    if (!review) {
        return (
            <div className="bg-white rounded-lg p-6 border">
                <h4 className="text-lg font-semibold mb-2">
                    Alıcının Değerlendirmesi
                </h4>

                <p className="text-gray-500">
                    Henüz değerlendirme yapılmadı.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg p-6 border">
            <h4 className="text-lg font-semibold mb-4">
                Alıcının Değerlendirmesi
            </h4>

            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {review.kullaniciAdi?.charAt(0).toUpperCase()}
                </div>

                <div>
                    <p className="font-medium">
                        {review.kullaniciAdi}
                    </p>

                    <div className="flex text-yellow-400">
                        {"★★★★★"}
                    </div>
                </div>
            </div>

            <p className="text-gray-600">
                {review.aciklama}
            </p>
        </div>
    );
};

