export function PostSort  ({ sortType, onChange })  {
    const sortLabels = {
        all: "Tüm İlanlar Göster",
        oldToNew: "Eskiden Yeniye Göster",
        newToOld: "Yeniden Eskiye Göster",
    };

    return (
        <div className="max-w-md p-4">
            <label
                htmlFor="sort"
                className="block mb-2 font-semibold text-gray-400"
            >
                İlanları Sırala:
            </label>

            <select
                id="sort"
                value={sortType}
                onChange={onChange}
                className="w-full border p-4 border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
                <option value="all">
                    Tüm İlanlar Göster
                </option>

                <option value="oldToNew">
                    Eskiden Yeniye Göster
                </option>

                <option value="newToOld">
                    Yeniden Eskiye Göster
                </option>
            </select>

            <p className="mt-4 text-gray-600">
                Seçilen sıralama:{" "}
                <span className="font-semibold">
                    {sortLabels[sortType]}
                </span>
            </p>
        </div>
    );
};

