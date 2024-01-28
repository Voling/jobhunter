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
    // const {position, setPosition, listings, setListings} = React.useContext(MapContext);
    var mk = [];
    //var mkCoords = [[33.68, -117.82], [33.68, -117.83], [33.67, -117.81], [33.65, -117.82], [33.68, -117.81], [33.68, -117.82]];
    //for (let i = 0; i < 6; i++) {
    //    mk.push(<Marker key={i} position={[mkCoords[i][0], mkCoords[i][1]]} icon={testIcon}></Marker>)
    //}
    /*
    Title
    Location
    Company
    Address
    Lat
    Lng
    Geo_distance
    Real_distance
    */
    const { position, setPosition, listings, setListings } = React.useContext(MapContext);
    //fetchListings(position)
    for (const i in listings) {
        //return [<Marker position = {[0,0]} icon = {"ABC"}></Marker>]
        //return <Marker position = {[i[0], i[1]]} icon = {i[5]}></Marker>
    }
    //return [<Marker position = {[0,0]} icon = {"ABC"}></Marker>]; //for each job listing found
}
export default Listings;