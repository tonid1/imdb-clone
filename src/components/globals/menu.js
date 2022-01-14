import React from "react";

function Menu({menu, closeMenu}){

    return(
        <section>
            <div className={!menu ? 'menu-div' : 'menu-div-active'}>
                <div className='menu-div-one'>
                    <h4>FakeFlix</h4>
                </div>
                <div className='menu-div-two' >
                    <ul>
                        <li>
                            <a href='/#movies'>Movies</a>
                        </li>
                        <li>
                            <a href='/#actors'>Actors</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={!menu ? 'menu-overlay' : 'menu-overlay-active'} onClick={closeMenu}>
                
            </div>
        </section>
    )

}

export default Menu