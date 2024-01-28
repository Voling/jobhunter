import React from 'react';
import {Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import MapContext from './MapContext.js'
import { useContext } from 'react';
import { fetchListings } from './api.js';


const testIcon = new L.Icon({
    iconUrl: 'images/ethansditto.png', // URL to the custom icon image
    iconSize: [70, 41],    // Size of the icon
    iconAnchor: [12, 41],  // Point of the icon which will correspond to marker's location
    popupAnchor: [15, -35], // Point from which the popup should open relative to the iconAnchor
}); //testing
function Listings() {
    //const {position, setPosition, listings, setListings} = React.useContext(MapContext);
    const { position, setPosition, listings, setListings } = React.useContext(MapContext);
    console.log("HI" + Array.isArray(listings))
    return listings.map((listing, index) => (
        <Marker 
            key={index}
            position={[listing.Lat, listing.Lng]} 
            icon={testIcon}>
            <Popup>
                <div>
                    <h3>{listing.Title}</h3>
                    <p>{listing.Location}</p>
                    <p>{listing.Company}</p>
                    <p>{listing.Address}</p>
                    <p>Geo Distance: {listing.Geo_distance} mi</p>
                    <p>Real Distance: {listing.Real_distance} mi</p>
                </div>
            </Popup>
        </Marker>
    ));
}
export default Listings;