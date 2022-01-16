import React, { useState, useEffect } from 'react'

import './Nav.css';

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        })

        return () => {
            window.removeEventListener('scroll');
        }
    }, [])

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <img
                className='nav__logo'
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/800px-Netflix_2015_logo.svg.png"
                alt="Logo netflix"
            />
            <img
                className='nav__avatar'
                src="https://i.pinimg.com/originals/2b/90/0d/2b900d5612554cd0b5edf7d8e848c3ea.png"
                alt="Logo profile"
            />
        </div>
    )
}

export default Nav
