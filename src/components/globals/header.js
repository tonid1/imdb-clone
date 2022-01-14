import React, { useState } from "react";
import BgPic from "../../images/color-1024x488.jpeg";
import MenuIcon from '../../images/menu-bar.png';
import Popcorn from "../../images/popcorn.png";
import Menu from './menu';
import Search from "./search";

function Header(){
    const [menu, setMenu] = useState(false);

    const openMenu = () => {
        setMenu(true);
    }

    const closeMenu = () => {
        setMenu(false);
    }

    return(
        <section className='header' style={{backgroundImage: "url("+BgPic+")"}}>
            <Menu menu={menu} closeMenu={closeMenu}/>
            <div className='header-div-inner'>
                <div className='menu-icon-div' onClick={openMenu}>
                    <img alt='menu-icon' src={MenuIcon} className='menu-icon'/>
                </div>
                < Search />
            </div>
            <h2 className="site-title">
                <a href="/">FakeFlix</a>
            </h2>
            <div className='header-popcorn-bg'>
                <div className='header-popcorn' style={{backgroundImage: 'url('+Popcorn+')'}}></div>
            </div>
        </section>
    )
}

export default Header;