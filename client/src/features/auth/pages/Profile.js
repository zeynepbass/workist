import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import {
  faUser,
  faCog,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/atoms";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
export default function Profile() {
  const { user } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = () => {
    setOpen(false);
    localStorage.clear();
    queryClient.clear();
    toast.success("Çıkış yapıldı");
    navigate("/");
  };
  return (
    <div className="w-full flex justify-center items-center pr-6 relative bg-transparent">
      <div className="relative" ref={dropdownRef}>
        <Button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-4 px-4 py-2 bg-transparent focus:outline-none"
        >
          {" "}
          {user?.file ? (
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={user.file}
              alt="Kullanıcı Fotoğrafı"
            />
          ) : (
            ""
          )}
          <div className="text-left">
            <p className="text-base font-semibold text-gray-800">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-gray-500">
              {user?.unvan || "ünvan ekli değil."}
            </p>
          </div>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-gray-500"
            size="sm"
          />
        </Button>

        {open && (
          <div className="absolute left-0  w-60 bg-white rounded-md shadow-lg z-20">
            <ul className="py-1">
              <li>
                <Link
                  to="/profilim"
                  className="flex items-center px-4 py-2 hover:bg-purple-100 text-gray-400"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-3 text-purple-600"
                  />
                  Profilim
                </Link>
              </li>
              <li>
                <Link
                  to="/hesabim"
                  className="flex items-center px-4 py-2 hover:bg-purple-100 text-gray-400"
                >
                  <FontAwesomeIcon
                    icon={faCog}
                    className="mr-3 text-purple-600"
                  />
                  Hesabım
                </Link>
              </li>
              <li
                onClick={handleLogout}
                className="flex items-center px-4 py-2 hover:bg-purple-100 text-gray-400 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="mr-3 text-purple-600"
                />
                Çıkış Yap
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
