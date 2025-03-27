import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Itinerary from "./components/Itinerary";
import App from "./App";
import App2 from "./App2";
import Template from "./Template"

function RoutesNav() {
    return (
        <Router>
    
          <Routes>
            <Route path="/" element={<App />} />
           
            <Route path="/itinerary" element={<App2 />}/>
            <Route path="/template/:id" element={<Template/>} />

           
            
          </Routes>
        </Router>
        
      );
}


export default RoutesNav;