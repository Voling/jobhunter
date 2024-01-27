import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "images/ethansditto.png", // URL to the custom icon image
  iconSize: [70, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [15, -35], // Point from which the popup should open relative to the iconAnchor
});

function Map() {
  const [position, setPosition] = React.useState([33.64, -117.838]);
  function ClickHandler({ onClick }) {
    useMapEvents({
      click(e) {
        setPosition(e.latlng); //update
        onClick(e.latlng); //pass to onclick
        console.log(e.latlng); //print
      },
    });
  }
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>UCI</Popup>
      </Marker>
      <ClickHandler onClick={changeHouseLocation} />
    </MapContainer>
  );
}
function changeHouseLocation() {}
function drawListing() {
  return <Marker></Marker>; //for each job listing found
}

export default Map;
