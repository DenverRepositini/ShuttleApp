import React from 'react';
import { Link } from "react-router-dom";
import './home.scss'

const HomePage = () => {
    return (
        <>
          <div className='home' >
             <div className='home__user' >
                <h3 className='home__title' >User Section</h3>
                <Link to = '/workshuttle'>
                    <div className='home__user__pages'>Work Trips</div>
                </Link>
                <Link to = '/groceryshuttle'>
                    <div className='home__user__pages'>Grocery Trips</div>
                </Link>
                <Link to = '/shuttlelocation'>
                    <div className='home__user__pages'>Ping Shuttle</div>
                </Link>
             </div>
             <div className='home__driver' >
                <h3 className='home__title' >Driver</h3>
                    <Link to = '/driver'> 
                      <div className='home__user__pages'>Driver Location</div>
                    </Link>
             </div>
          </div>
        </>
    )
}

export default HomePage;