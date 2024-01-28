import React from 'react';
import {Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import MapContext from './MapContext.js'
import { useContext } from 'react';
import { fetchListings } from './api.js';
import './Listings.css'
const testIcon = new L.Icon({
    iconUrl: 'images/ethansditto.png', // URL to the custom icon image
    iconSize: [70, 41],    // Size of the icon
    iconAnchor: [12, 41],  // Point of the icon which will correspond to marker's location
    popupAnchor: [15, -35], // Point from which the popup should open relative to the iconAnchor
}); //testing
const iconSize = [50, 50]
const iconAnchor = [25, 50]
const popupAnchor = [25, -35]
function Listings() {
    //update listings based on state
    const { position, setPosition, listings, setListings } = React.useContext(MapContext);
    console.log("Updating Listings...")
    return listings.map((listing, index) => (
        <Marker 
            key={index}
            position={[listing.Lat, listing.Lng]} 
            icon={testIcon}>
            <Popup>
                <div style={{color: 'blue'}}>
                    <h3>{listing.Title}</h3>
                    <p class='markerField'>{listing.Company}</p>
                    <p class='markerField'>{listing.Location}</p>
                    <p class='markerField'>{listing.Address}</p>
                    <p class='markerField'>Geo Distance: {listing.Geo_distance} mi</p>
                    <p class='markerField'>Real Distance: {listing.Real_distance} mi</p>
                </div>
            </Popup>
        </Marker>
    ));
}
export default Listings;