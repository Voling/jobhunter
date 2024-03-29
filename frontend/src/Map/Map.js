import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import Menu from "./Menu.js";
import Listings from "./Listings.js";
import MapContext from "./MapContext";
import { useContext, useEffect } from "react";
/*
Context:
    position: [x,y] latlng of house marker
    listings: [[x,y], [a, b]...] latlngs of X precreated markers
        Y of X markers will be rendered/not rendered based on f(Y) job listings (y*2?) for smooth performance
*/

function Map() {
  const { position, setPosition, listings, setListings } =
    useContext(MapContext);

  // if (addressSet) {
  //     (function changeHouseLocation() {
  //         setPosition([]) // api coordinates from backend
  //     })();
  //     (async function retrieveJobResults() {
  //         return [[]]; //input, radius,
  //     })().then() //backend
  //     //setListings(listings.empty());
  //     console.log(address); //print
  // }

  function ClickHandler({ onClick }) {
    //on click, move marker and show listings.
    useMapEvents({
      click(e) {
        (function changeHouseLocation() {
          setPosition([e.latlng.lat, e.latlng.lng]);
        })();
        (async function retrieveJobResults() {
          return [[]]; //input, radius,
        })().then(); //backend
        //setListings(listings.empty());
        console.log(e.latlng); //print
      }, //
    });
    // console.log(address)
  }

  return (
    <div className="app-container">
      <div className="menu-section">
        <Menu></Menu>
      </div>
      <div className="map-section">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={testIcon}>
            <Popup>UCI</Popup>
          </Marker>
          <Listings></Listings>
          <ClickHandler />
        </MapContainer>
      </div>
    </div>
  );
}
const testIcon = new L.Icon({
  iconUrl: "map_resources/pin.png", // URL to the custom icon image
  iconSize: [40, 50], // Size of the icon
  iconAnchor: [20, 25], // midpoint
  popupAnchor: [0, -25], // offset from iconanchor
}); //testing
export default Map;
