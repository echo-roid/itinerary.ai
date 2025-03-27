import React, { useState } from "react";

function TripForm({ fetchItinerary }) {
  const [days, setDays] = useState("");
  const [destination, setDestination] = useState("");
  const [style, setStyle] = useState("");
  const [pax, setPax] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchItinerary(days, destination, style,pax);
  };

  return (
    <div className=" flex flex-wrap flex-col  justify-center gap-4">
      <select
        className="px-4 py-2 border rounded-lg w-100 text-gray-500"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      >
        <option>Travel days</option>
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Destination"
        className="px-4 py-2 border rounded-lg w-100 text-gray-500"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <select
        className="px-4 py-2 border rounded-lg w-100 text-gray-500"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
      >
        <option>Travel style</option>
        <option value="Relaxation">Relaxation</option>
        <option value="Cultural and Historical">Cultural and Historical</option>
        <option value="Romantic for Couples">Romantic for Couples</option>
        <option value="Family-Friendly">Family-Friendly</option>
        <option value="Adventure and Outdoor">Adventure and Outdoor</option>
      </select>


        
      <input
        type="text"
        placeholder="Pax"
        className="px-4 py-2 border rounded-lg w-100 text-gray-500"
        value={pax}
        onChange={(e) => setPax(e.target.value)}
      />
     

      <button
        className="mt-6 bg-[#fff] shadow-md poppins-semibold hover:bg-white text-black font-semibold px-6 py-3 rounded-lg"
        onClick={handleSubmit}
      >
        ✨ Run
      </button>
    </div>
  );
}

export default TripForm;