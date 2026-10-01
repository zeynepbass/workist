import { AD_ADDON_OPTIONS, AD_EXTRA_OPTIONS, AD_OPTION_PRICE } from "../../schemas";

function OptionGroup({ legend, section, options, register }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
        {legend}
      </legend>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.key}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50"
          >
            <input
              type="checkbox"
              className="h-4 w-4 accent-purple-600"
              {...register(`${section}.${option.key}`)}
            />
            <span>{option.label}</span>
            <span className="ml-auto text-xs text-gray-400">+{AD_OPTION_PRICE} TL</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function AdOptionsFields({ register }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <OptionGroup
        legend="Kod Fiyatlandırma"
        section="addons"
        options={AD_ADDON_OPTIONS}
        register={register}
      />
      <OptionGroup
        legend="Ekstra"
        section="extras"
        options={AD_EXTRA_OPTIONS}
        register={register}
      />
    </div>
  );
}
