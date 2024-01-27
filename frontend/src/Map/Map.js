import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css'
import Menu from './Menu.js'
import Listings from './Listings.js'
/*
Context: input
State:
    position: [x,y] latlng of house marker
    listings: [[x,y], [a, b]...] latlngs of X precreated markers
        Y of X markers will be rendered/not rendered based on f(Y) job listings (y*2?) for smooth performance
        
*/

function Map() {
    const [position, setPosition] = React.useState([33.640, -117.838]);
    const [showListings, setShowListings] = React.useState(false);
    function ClickHandler({ onClick }) {
        useMapEvents({
            click(e) {
                (function changeHouseLocation() {
                    setPosition(e.latlng)
                })();
                (async function retrieveJobResults() {
                    return [[]]; //input, radius, 
                })().then() //backend
                setShowListings(true);
                console.log(e.latlng); //print
            }
        })
    }
    return (
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
                    {showListings && <Listings></Listings>}
                    <ClickHandler/>
                </MapContainer>
            </div>
        </div>

    );

}
const testIcon = new L.Icon({
    iconUrl: 'images/ethansditto.png', // URL to the custom icon image
    iconSize: [70, 41],    // Size of the icon
    iconAnchor: [12, 41],  // Point of the icon which will correspond to marker's location
    popupAnchor: [15, -35], // Point from which the popup should open relative to the iconAnchor
}); //testing





export default Map;
