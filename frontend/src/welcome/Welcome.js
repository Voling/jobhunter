import React from 'react';
import { Link } from 'react-router-dom';
import './welcome.css';

export default function Welcome() {
    return (
        <div className='header'>
            <h1>Job Hunter</h1>
            <h4>Team Members: </h4>
            {/* <img src="/images/cover.png" style = {{width: 240, height:100 }} alt="Description" /> */}
            <Link to="/map" className="button-style">Go to Map</Link>
        </div>
    );
}

