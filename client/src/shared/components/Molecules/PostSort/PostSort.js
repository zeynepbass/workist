import { Select } from "@/shared/atoms";
export function PostSort  ({ sortType, onChange })  {
    const sortLabels = {
        all: "Tüm İlanlar Göster",
        oldToNew: "Eskiden Yeniye Göster",
        newToOld: "Yeniden Eskiye Göster",
    };

    return (
        <div className="max-w-md p-4">



<Select
label="          İlanları Sırala"
  id="sort"
  value={sortType}
  onChange={onChange}
  options={[
    {
      value: "all",
      label: "Tüm İlanları Göster",
    },
    {
      value: "oldToNew",
      label: "Eskiden Yeniye Göster",
    },
    {
      value: "newToOld",
      label: "Yeniden Eskiye Göster",
    },
  ]}
  placeholder={null}
  className="p-4 border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
/>



            <p className="mt-4 text-gray-600">
                Seçilen sıralama:{" "}
                <span className="font-semibold">
                    {sortLabels[sortType]}
                </span>
            </p>
        </div>
    );
};

