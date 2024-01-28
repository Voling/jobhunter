import React from 'react';

export const MapContext = React.createContext({
     position: [33.640, -117.838],
     setPosition: () => { },
     listings: [],
     setListings: () => { }
})
export default MapContext;
