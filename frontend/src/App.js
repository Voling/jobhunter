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

function App() {
  const location = useLocation();

  return (
    // <TransitionGroup>
    // <CSSTransition key={location.key} classNames="fade" timeout={300}>

    <Routes location={location} keys={location.pathname}>
      <Route index element={<Welcome />} />
      <Route path="/map" element={<Map />} />
      <Route path="/about" element={<About />} />
    </Routes>

    //     </CSSTransition>
    // </TransitionGroup>
  );
}

export default App;
