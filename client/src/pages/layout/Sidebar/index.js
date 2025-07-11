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
const index = () => {
    const icons = [
        { icon: faGlobe, label: "Genel", link: "/ilanlar" },
        { icon: faCode, label: "Workist", link: "/workist" },
        { icon: faShoppingCart, label: "Siparişlerim", link: "/siparislerim" },
        { icon: faUsers, label: "Sana uygun istekler", link: "/istekler" },
        { icon: faThumbtack, label: "Satışlarım", link: "/satislarim" },
        { icon: faHome, label: "Portfolyom", link: "/portfolyom" },
        { icon: faBook, label: "İlanlarım", link: "/ilanlarim" },
        { icon: faHandshake, label: "Sana Uygun Alıcı İstekleri", link: "/istekler" },
    ];
    return (
        <>
            <ul className="list-outside float-end pr-3">
                {icons.slice(0, 2).map((item) => {
                    return (
                        <>
                            <Link to={item.link} > <li className="flex flex-row items-center cursor-pointer text-gray-400 hover:text-purple-800 p-3"><span>        <FontAwesomeIcon icon={item.icon} /></span><span className='text-gray-400 pl-2'>{item.label} </span></li></Link>
                        </>

                    )
                })}
                <br />
                <h5 className='text-gray-700 font-bold uppercase'>Freelancer</h5>
                <hr />
                {icons.slice(3, 7).map((item) => {
                    return (
                        <>
                            <Link to={item.link} >   <li className="flex flex-row items-center p-5 gap-2 cursor-pointer text-gray-400 hover:text-purple-800">
                                <FontAwesomeIcon icon={item.icon} />
                                <span className='pl-2'>{item.label}</span>
                            </li></Link>

                        </>

                    )
                })}
            </ul>

        </>

    )
}

export default index
