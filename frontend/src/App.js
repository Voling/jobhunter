import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Welcome from './welcome/Welcome';
import Map from './Map/Map';

function App() {

  // const location = useLocation();

    return (
      // <TransitionGroup>
      // <CSSTransition key={location.key} classNames="fade" timeout={300}>

        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/map" element={<Map />} />
            </Routes>
        </Router>

    //     </CSSTransition>
    // </TransitionGroup>
    );
}

export default App;
