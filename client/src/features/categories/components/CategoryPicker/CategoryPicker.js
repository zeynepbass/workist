import { useCategories } from "../../hooks/useCategories";

const CATEGORY_ICONS = {
  "graphic-design": "/assets/graphic-designer.png",
  "writing-translation": "/assets/ab.png",
  "software-technology": "/assets/software.png",
};

function Choice({ selected, onSelect, children }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`rounded-lg border-2 p-4 text-center ${selected ? "border-purple-600 bg-purple-100" : "border-gray-300"}`}
    >
      {children}
    </button>
  );
}

export default function CategoryPicker({ category, subcategory, onChange }) {
  const { categories, subcategoriesOf } = useCategories();

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-3 font-semibold text-gray-600">Kategori</legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {categories.map((item) => (
            <Choice
              key={item.slug}
              selected={category === item.slug}
              onSelect={() => onChange({ category: item.slug, subcategory: "" })}
            >
              {CATEGORY_ICONS[item.slug] && (
                <img
                  src={CATEGORY_ICONS[item.slug]}
                  alt=""
                  width="50"
                  height="50"
                  className="mx-auto"
                />
              )}
              <span className="mt-2 block font-medium text-gray-500">{item.label}</span>
            </Choice>
          ))}
        </div>
      </fieldset>

      {category && (
        <fieldset>
          <legend className="mb-3 font-semibold text-gray-600">Alt kategori</legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {subcategoriesOf(category).map((item) => (
              <Choice
                key={item.slug}
                selected={subcategory === item.slug}
                onSelect={() => onChange({ category, subcategory: item.slug })}
              >
                <span className="font-medium text-gray-500">{item.label}</span>
              </Choice>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}
