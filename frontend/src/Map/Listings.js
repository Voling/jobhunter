import React from 'react';
import {Marker, Popup} from 'react-leaflet'
import './Query.ts'
function Listings() {
    var mk = [];
    for (let i = 0; i < 10; i++) {
        mk.push(<Marker position={[0, 0]}></Marker>)
    }
    const [markers, setMarkers] = React.useState(mk)
    return markers; //for each job listing found
}
export default Listings;