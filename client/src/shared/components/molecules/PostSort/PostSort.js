import { Select } from "../../atoms";

const SORT_OPTIONS = [
  { value: "newest", label: "Yeniden eskiye" },
  { value: "oldest", label: "Eskiden yeniye" },
];

export function PostSort({ sortType, onChange }) {
  return (
    <div className="max-w-xs p-4">
      <Select
        label="İlanları sırala"
        id="post-sort"
        value={sortType}
        onChange={onChange}
        options={SORT_OPTIONS}
        placeholder={null}
        className="rounded-md border-gray-300 text-gray-600"
      />
    </div>
  );
}
