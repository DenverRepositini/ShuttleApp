import React from 'react';
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <div>User Section</div>
            <div>
                <Link to = '/workshuttle'>Work Trips</Link>
            </div>
            <div>
                <Link to = '/groceryshuttle'>Grocery Trips;</Link>
            </div>
            <div>
                <Link to = '/shuttlelocation'>Ping Shuttle</Link>
            </div>
            <div>Driver</div>
            <div>
                <Link to = '/driver'>Driver Location</Link>
            </div>
        </>
    )
}

export default HomePage;