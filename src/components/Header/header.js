import React from 'react'
// import './header.scss';
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="header">
            <div className='logo'>
               <Link to='/shuttle'>Home</Link>
            </div>
            <div className='search'>
                <input type="search" className='search__input' placeholder='Search'/>
                
            </div>
            <div className='button'>
                <Link className='button__item' to='/shuttlelocation'>Ping Shuttle</Link>
             
            </div>
        </div>
    );
}

export default Header;