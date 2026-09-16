import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCode,
    faGlobe,
    faShoppingCart,
    faUsers,
    faThumbtack,
    faHome,
    faBook,
    faHandshake
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"
export default function Sidebar ()  {
    const icons = [
        { icon: faGlobe, label: "General", link: "/ilanlar" },
        { icon: faCode, label: "Workist", link: "/workist" },
        { icon: faShoppingCart, label: "Siparişlerim", link: "/siparisler" },
        { icon: faUsers, label: "Sana uygun istekler", link: "/istekler" },
        { icon: faThumbtack, label: "Satışlarım", link: "/satislar" },
        { icon: faHome, label: "Portfolyom", link: "/portfolyom" },
        { icon: faBook, label: "İlanlarım", link: "/ilanlarim" },
        { icon: faHandshake, label: "Sana Uygun Alıcı İstekleri", link: "/istekler" },
    ];
    return (
        <ul className="flex flex-row overflow-x-auto whitespace-nowrap md:flex-col md:overflow-visible md:whitespace-normal md:items-end md:pr-3">
            {icons.slice(0, 2).map((item) => (
                <Link to={item.link} key={item.link}>
                    <li className="flex flex-row  items-center p-3 md:p-5 gap-2 cursor-pointer text-gray-400 hover:text-purple-800">
                        <FontAwesomeIcon icon={item.icon} />
                        <span className="pl-2 hidden sm:inline">{item.label}</span>
                    </li>
                </Link>
            ))}

            <h5 className="hidden md:block text-gray-700 font-bold uppercase mt-2">Freelancer</h5>
            <hr className="hidden md:block w-full" />

            {icons.slice(3, 7).map((item) => (
                <Link to={item.link} key={item.link}>
                    <li className="flex flex-row   items-center text-center p-3 md:p-5 gap-2 cursor-pointer text-gray-400 hover:text-purple-800">
                        <FontAwesomeIcon icon={item.icon} />
                        <span className="pl-2 hidden  sm:inline">{item.label}</span>
                    </li>
                </Link>
            ))}
        </ul>
    )
}


