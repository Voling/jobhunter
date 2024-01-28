import React from 'react';
import MapContext from './MapContext';
import { useContext } from 'react'
import { fetchListings } from './api';

function Menu() {
    const { position, setPosition, listings, setListings } = useContext(MapContext);
    const [input, setInput] = React.useState("")
    const [radius, setRadius] = React.useState(5)

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
        // e.preventDefault(); // Prevent the default form submission behavior
        // console.log("Form submitted. Job Name:", input, "Radius:", radius, "Position X:", position[0], "Position Y:", position[1]);
        e.preventDefault();
        try {
            const data = fetchListings({
                keyword: input,
                radius: radius,
                positionX: position[0],
                positionY: position[1]
            });

            console.log("Listings fetched successfully:", data);
            setListings(data);
        } catch (error) {
            console.error("Failed to fetch listings:", error);
        }
    }

    return (
        <div>
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
    );
}

export default Menu