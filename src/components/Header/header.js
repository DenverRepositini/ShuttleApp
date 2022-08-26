import React from 'react'
// import './header.scss';
import { Link } from "react-router-dom"
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';


const Header = () => {
    return (
        <div className="header">
            <div className='logo'>
               <Link to='/'>  <AirportShuttleIcon fontSize='large'/>shuttleApp</Link>
            </div>
        </div>
    );
}

export default Header;