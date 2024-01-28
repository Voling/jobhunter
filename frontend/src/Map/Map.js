import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css'
import Menu from './Menu.js'
import Listings from './Listings.js'
import MapContext from './MapContext'; // Import the context
/*
Context: input
State:
    position: [x,y] latlng of house marker
    listings: [[x,y], [a, b]...] latlngs of X precreated markers
        Y of X markers will be rendered/not rendered based on f(Y) job listings (y*2?) for smooth performance
*/

// export const MapContext = React.createContext({
//     position: [33.640, -117.838],
//     setPosition: () => { },
//     listings: [],
//     setListings: () => { }
// })

function Map() {
    const [position, setPosition] = React.useState([33.640, -117.838]);
    const [listings, setListings] = React.useState([]);
    function ClickHandler({ onClick }) { //on click, move marker and show listings.
        useMapEvents({
            click(e) {
                (function changeHouseLocation() {
                    setPosition(e.latlng)
                })();
                (async function retrieveJobResults() {
                    return [[]]; //input, radius, 
                })().then() //backend
                //setListings(listings.empty());
                console.log(e.latlng); //print
            } //
        })
    }
    return (
        // <MapContext.Provider value={{ position, setPosition, listings, setListings }}>
            <div className="app-container">
                <div className="menu-section">
                    <Menu></Menu>

                </div>
                <div className="map-section">
                    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={position} icon={testIcon}>
                            <Popup>
                                UCI
                            </Popup>
                        </Marker>
                        {listings.length == 0 && <Listings></Listings>}
                        <ClickHandler />
                    </MapContainer>
                </div>
            </div>
        // </MapContext.Provider>
    );

}
const testIcon = new L.Icon({
    iconUrl: 'images/ethansditto.png', // URL to the custom icon image
    iconSize: [70, 41],    // Size of the icon
    iconAnchor: [12, 41],  // Point of the icon which will correspond to marker's location
    popupAnchor: [15, -35], // Point from which the popup should open relative to the iconAnchor
}); //testing
export default Map;
