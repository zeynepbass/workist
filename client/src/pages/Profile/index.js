import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import {
  faUser,
  faCog,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function ProfileCard() {
  const users = JSON.parse(localStorage.getItem("login"));
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
const navigate=useNavigate()
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
const handleClick=()=>{
  localStorage.clear();
  navigate("/")
}
  return (
    <div className="w-full flex justify-center items-center pr-6 relative bg-transparent">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-4 px-4 py-2 bg-transparent focus:outline-none"
        >
        {users?.result?.file ? <img
            className="h-12 w-12 rounded-full object-cover"
            src={users?.result?.file}
            alt="Kullanıcı Fotoğrafı"
          />
 : ""}
         

          <div className="text-left">
            <p className="text-base font-semibold text-black">{users?.result?.firstName} {users?.result?.lastName}</p>
            <p className="text-sm text-gray-500">{users?.result?.unvan ? users?.result?.unvan : "ünvan ekli değil."}</p>


          </div>


          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-gray-500"
            size="sm"
          />
        </button>


        {open && (
          <div className="absolute left-0  w-60 bg-white rounded-md shadow-lg z-20">
            <ul className="py-1">
              <li>
                <Link
                  to="/profilim"
                  className="flex items-center px-4 py-2 hover:bg-purple-100 text-gray-400"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-3 text-purple-600" />
                  Profilim
                </Link>
              </li>
              <li>
                <Link
                  to="/hesabim"
                  className="flex items-center px-4 py-2 hover:bg-purple-100 text-gray-400"
                >
                  <FontAwesomeIcon icon={faCog} className="mr-3 text-purple-600" />
                  Hesabım
                </Link>
              </li>
              <li
                onClick={() => {
                  setOpen(false);
                  alert("Çıkış yapıldı");
                  navigate("/")
                }}
                className="flex items-center px-4 py-2 hover:bg-purple-100 text-gray-400 cursor-pointer"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-purple-600" onClick={handleClick} />
                Çıkış Yap
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
