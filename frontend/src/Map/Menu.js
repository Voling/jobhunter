import React from 'react';
import './Query.ts'
// import MapContext from './MapContext';

function Menu() {
    // const { position, listings, setPosition, setListings } = useContext(MapContext);
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
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("Form submitted. Job Name:", input, "Radius:", radius, "Position X:", "Position Y:");
        // send to Query.ts (positionX, positionY, input, radius)
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