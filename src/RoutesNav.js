import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Itinerary from "./components/Itinerary";
import App from "./App";
import App2 from "./App2";

function RoutesNav() {
    return (
        <Router>
    
          <Routes>
            <Route path="/" element={<App />} />
            {/* <Route path="/itinerary" element={<Itinerary />}>
             
            </Route> */}
            <Route path="/itinerary" element={<App2 />}>
             
             </Route>
            
          </Routes>
        </Router>
        
      );
}


export default RoutesNav;