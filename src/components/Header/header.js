import React from 'react'
import './header.scss';
import { Link } from "react-router-dom"
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';


const Header = () => {
    return (
        <div className="header">            
            <Link to='/'>  
                <div className='link'>
                <AirportShuttleIcon fontSize='large'/>shuttleApp
                </div>
            </Link>  
        </div>
    );
}

export default Header;