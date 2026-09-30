import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faComment, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import ProfileMenu from "@/features/auth/components/ProfileMenu";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { Button, Input } from "@/shared/components/atoms";

export default function Header() {
  const navigate = useNavigate();
  const { categories } = useCategories();

  const [search, setSearch] = useState("");
  const [openCategory, setOpenCategory] = useState(null);

  const handleSearch = () => {
    const term = search.trim();

    if (term) {
      navigate(`/ilanlar?search=${encodeURIComponent(term)}`);
    }
  };

  const handleSubcategoryClick = (slug) => {
    setOpenCategory(null);
    navigate(`/ilanlar?subcategory=${encodeURIComponent(slug)}`);
  };

  return (
    <div className="border-b-2 ">
      <div className="flex flex-wrap items-center gap-4 p-4 md:p-2">
        <div className="order-1">
          <Button
            onClick={() => navigate("/workist")}
            className="text-purple-950 font-bold uppercase cursor-pointer hover:text-gray-500"
          >
            workist
          </Button>
        </div>

        <div className="order-3 md:order-2 w-full md:w-auto md:flex-1 flex flex-col sm:flex-row items-center justify-center gap-2">
          <div className="relative w-full max-w-lg">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              type="text"
              aria-label="İlan ara"
              placeholder="Arama yap..."
              className="pl-10 w-full border-b-2 border-gray-300 rounded-md py-2 outline-none  focus:ring-2 focus:ring-purple-950"
            />
          </div>
          <div className="flex justify-center gap-6 text-md text-purple-950 py-2 sm:p-5">
            <Link to="/konusmalar" aria-label="Konuşmalar">
              <FontAwesomeIcon icon={faBook} className="hover:text-purple-600 " />
            </Link>

            <Link to="/sohbet" aria-label="Sohbet">
              <FontAwesomeIcon icon={faComment} className="hover:text-purple-600" />
            </Link>
          </div>
        </div>

        <div className="order-2 md:order-3 ml-auto md:ml-0 flex justify-end">
          <ProfileMenu />
        </div>
      </div>
      <hr />
      <ul className="flex flex-wrap justify-around items-center gap-x-4 gap-y-2 text-gray-400 capitalize p-3 md:p-5">
        {categories.map((category) => (
          <li key={category.slug} className="relative z-10">
            <button
              type="button"
              aria-expanded={openCategory === category.slug}
              className="cursor-pointer"
              onClick={() =>
                setOpenCategory((previous) => (previous === category.slug ? null : category.slug))
              }
            >
              {category.label}
            </button>

            {openCategory === category.slug && (
              <ul className="absolute top-full left-0 bg-white shadow-md rounded mt-2   min-w-[200px]  text-gray-400">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.slug}>
                    <button
                      type="button"
                      className="w-full p-5 text-left hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSubcategoryClick(subcategory.slug)}
                    >
                      {subcategory.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
