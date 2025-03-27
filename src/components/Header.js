import React from "react";
import { Typewriter } from "react-simple-typewriter";

function Header() {
  return (
    <div className="flex justify-center py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white flex items-center justify-center poppins-black">
          <Typewriter
            words={["AI Trip Planner 🌴", "Travel Guide ✈️"]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>
        <p className="text-lg text-white mt-2 poppins-semibold">
          Plan your dream trip with personalized itineraries.
        </p>
      </div>
    </div>
  );
}

export default Header;
