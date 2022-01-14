import React from "react";

function Footer(){

    return(
        <section className='footer-section'>
            <div className='footer-outter'>
                <h2 className="site-title-footer">
                    <a href="/">Fake<br/>Flix</a>
                </h2>
            </div>
            <div className='footer-outter'>
                <div className='footer-inner'>            
                    <a href='/#movies' className='footer-link'>Popular movies</a>
                    <a href='/#actors' className='footer-link'>Popular actors</a>
                </div>
            </div>
        </section>
    )
}

export default Footer;