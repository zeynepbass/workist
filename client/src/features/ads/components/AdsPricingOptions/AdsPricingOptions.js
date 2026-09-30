import { Input } from "@/shared/components/atoms";
import { AD_ADDON_OPTIONS, AD_EXTRA_OPTIONS } from "@/shared/constants/options";

function OptionGroup({ title, section, options, values, onCheckboxChange }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">{title}</h3>

      <div className="space-y-2">
        {options.map((item) => (
          <label
            key={item.key}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50"
          >
            <Input
              type="checkbox"
              checked={values[item.key]}
              onChange={() => onCheckboxChange(section, item.key)}
              className="h-4 w-4 accent-purple-600"
            />
            <span>{item.label}</span>
            <span className="ml-auto text-xs text-gray-400">+100 TL</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function AdsPricingOptions({ addons, extras, onCheckboxChange }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <OptionGroup
        title="Kod Fiyatlandırma*"
        section="addons"
        options={AD_ADDON_OPTIONS}
        values={addons}
        onCheckboxChange={onCheckboxChange}
      />

      <OptionGroup
        title="Extra*"
        section="extras"
        options={AD_EXTRA_OPTIONS}
        values={extras}
        onCheckboxChange={onCheckboxChange}
      />
    </div>
  );
}
