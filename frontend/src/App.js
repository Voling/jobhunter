import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Welcome from "./welcome/Welcome";
import Map from "./Map/Map";
import About from "./About/About";
import MapContext from "./Map/MapContext";

function App() {
  const location = useLocation();
  const [position, setPosition] = React.useState([33.640, -117.838]);
  const [listings, setListings] = React.useState([]);
  console.log(location)
  //const [position, setPosition, listings, setListings] = React.useContext(MapContext)
  console.log("hi")
  return (
    <MapContext.Provider value={{ position, setPosition, listings, setListings }}>
    <Routes location={location} keys={location.pathname}>
      <Route index element={<Welcome />} />
      <Route path="/map" element={<Map />} />
      <Route path="/about" element={<About />} />
    </Routes>
    </MapContext.Provider>
  );
}

export default App;
