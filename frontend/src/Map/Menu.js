import React from 'react';
import MapContext from './MapContext';
import { useContext } from 'react'
import { fetchListings } from './api';
import './menu.css'


function Menu() {
    const { position, setPosition, listings, setListings } = useContext(MapContext);
    const [input, setInput] = React.useState("")
    const [radius, setRadius] = React.useState(5)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    React.useEffect(() => {
        const timer = setTimeout(() => {
            console.log("Input updated")
        }, 2000)
        return () => clearTimeout(timer)
    }, [input])

    function handleInputChange(e) {
        setInput(e.target.value) //state management
    }

    function handleRadiusChange(e) {
        setRadius(e.target.value) // radius state management
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetchListings({
            keyword: input,
            radius: radius,
            positionX: position[0],
            positionY: position[1]
        }).then(data => {
            console.log("Listings fetched successfully:", data);
            setListings(data);
        }).catch(error => {
            console.error("Failed to fetch listings:", error);
        });
    }

    return (
        <>
            <button className='toggleMenu' onClick={toggleMenu}>
                Toggle Menu
            </button>
            <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <div style={{ backgroundColor: '#d3d3d3' }}>Input a job name...</div>
                        <input
                            type="text"
                            name="na"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <div style={{ backgroundColor: '#d3d3d3' }}>Select a radius</div>
                        <input
                            type="number"
                            name="radius"
                            value={radius}
                            onChange={handleRadiusChange}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Menu