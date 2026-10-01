import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCog, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

import { Avatar } from "@/shared/components/atoms";
import { useEscapeKey } from "@/shared/hooks/useEscapeKey";
import { useLogout } from "../../hooks/useAuthActions";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const ITEM_CLASS = "flex w-full items-center px-4 py-2 text-gray-500 hover:bg-purple-100";

export default function ProfileMenu() {
  const { user } = useCurrentUser();
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEscapeKey(() => setOpen(false), open);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-3 px-4 py-2"
      >
        <Avatar user={user} />
        <span className="text-left">
          <span className="block font-semibold text-gray-800">{user?.fullName}</span>
          <span className="block text-sm text-gray-500">{user?.title || "Ünvan eklenmedi."}</span>
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" size="sm" />
      </button>

      {open && (
        <ul role="menu" className="absolute right-0 z-20 w-60 rounded-md bg-white py-1 shadow-lg">
          <li role="none">
            <Link
              role="menuitem"
              to="/profilim"
              className={ITEM_CLASS}
              onClick={() => setOpen(false)}
            >
              <FontAwesomeIcon icon={faUser} className="mr-3 text-purple-600" />
              Profilim
            </Link>
          </li>
          <li role="none">
            <Link
              role="menuitem"
              to="/hesabim"
              className={ITEM_CLASS}
              onClick={() => setOpen(false)}
            >
              <FontAwesomeIcon icon={faCog} className="mr-3 text-purple-600" />
              Hesabım
            </Link>
          </li>
          <li role="none">
            <button
              role="menuitem"
              type="button"
              className={ITEM_CLASS}
              onClick={() => logout.mutate()}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-purple-600" />
              Çıkış Yap
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
