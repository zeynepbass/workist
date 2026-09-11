export default function OrderFilters  ({
    durumFilter,
    setDurumFilter,
    sortType,
    setSortType,
    arama,
    setArama,
})  {
    return (
        <div className="max-w-4xl mx-auto mt-6 bg-white rounded-lg p-4 border">
            <div className="flex flex-col md:flex-row gap-4">

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Sipariş Ara
                    </label>

                    <input
                        type="text"
                        value={arama}
                        onChange={(e) => setArama(e.target.value)}
                        placeholder="Alıcı ara..."
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-300"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Durum
                    </label>

                    <select
                        value={durumFilter}
                        onChange={(e) => setDurumFilter(e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm outline-none"
                    >
                        <option value="tum">Tümü</option>
                        <option value="devam">Devam Ediyor</option>
                        <option value="tamamlandi">Tamamlandı</option>
                        <option value="iptal">İptal</option>
                    </select>
                </div>

 
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Sıralama
                    </label>

                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm outline-none"
                    >
                        <option value="all">Varsayılan</option>
                        <option value="newToOld">Yeniden Eskiye</option>
                        <option value="oldToNew">Eskiden Yeniye</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

