import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCode,
  faGlobe,
  faHome,
  faShoppingCart,
  faThumbtack,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const GENERAL_LINKS = [
  { icon: faGlobe, label: "Genel", to: "/ilanlar" },
  { icon: faCode, label: "Workist", to: "/workist" },
  { icon: faShoppingCart, label: "Siparişlerim", to: "/siparisler" },
];

const FREELANCER_LINKS = [
  { icon: faUsers, label: "Alıcı İstekleri", to: "/istekler" },
  { icon: faThumbtack, label: "Satışlarım", to: "/satislar" },
  { icon: faHome, label: "Portfolyom", to: "/portfolyom" },
  { icon: faBook, label: "İlanlarım", to: "/ilanlarim" },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 p-3 md:p-4 ${isActive ? "text-purple-800 font-semibold" : "text-gray-400 hover:text-purple-800"}`;

function LinkGroup({ links }) {
  return links.map((link) => (
    <li key={link.to}>
      <NavLink to={link.to} end className={linkClass}>
        <FontAwesomeIcon icon={link.icon} aria-hidden="true" />
        <span className="hidden sm:inline">{link.label}</span>
      </NavLink>
    </li>
  ));
}

export default function Sidebar() {
  return (
    <nav aria-label="Ana menü">
      <ul className="flex flex-row overflow-x-auto whitespace-nowrap md:flex-col md:items-end md:pr-3">
        <LinkGroup links={GENERAL_LINKS} />
        <li className="hidden w-full border-b pt-2 text-right font-bold uppercase text-gray-700 md:block">
          Freelancer
        </li>
        <LinkGroup links={FREELANCER_LINKS} />
      </ul>
    </nav>
  );
}
