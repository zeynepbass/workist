import { Input } from "@/shared/components/atoms";
import { AD_OPTION_PRICE } from "@/shared/constants/options";

export default function AdsPriceField({ value, onChange, addons = {}, extras = {} }) {
  const selectedOptionCount = [...Object.values(addons), ...Object.values(extras)].filter(
    Boolean,
  ).length;

  const totalPrice = Number(value || 0) + selectedOptionCount * AD_OPTION_PRICE;

  return (
    <div>
      <label htmlFor="ad-price" className="block mb-1 font-semibold text-gray-700">
        Fiyat*
      </label>

      <p className="mt-2 text-sm text-gray-500">Toplam fiyat (seçimler dahil): {totalPrice} TL</p>
      <Input
        id="ad-price"
        type="number"
        min={100}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-5 border-2 border-purple-300 rounded bg-white text-gray-800"
      />
    </div>
  );
}
