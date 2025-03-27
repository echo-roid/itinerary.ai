import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TripForm from "./components/TripForm";
import { useNavigate } from "react-router-dom";
import bg from "./assets/bg.png"
import "./App.css";
import Loader from "./common/Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





function App() {



  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchItinerary = async (days, destination, style, pax) => {
    setLoading(true)
    const apiKey = "AIzaSyBY2Jn0QCW9jz_3b342-ArEexG6xxEK80M"; // Replace with your API key
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    const requestBody = {
      contents: [{
        parts: [{
          text: `${pax} ${style} ${days} days ${destination} trip plan itinerary data give json format please {
            "tripName": "",
            "destination": "",
            "duration": "",
             
            "focus": "",
            Hotels: [{"name":"" ,"dates":"","rating":"" ,"content":"", "Dates":"start-end", "location":"","imageUrl":""} give here all Hotel name you mention in below],
            policies:[{heading:"",para:""}]
            "people:"",
            "country":"name"
            "staynight":[ {
    "city": "Paris",
    "nights": 3
  } give there nightstay value and city name where i stay],
           
            "days": [
              {
                "day": 1,
                "theme": "",
                tripsummary:"write here every thing about trip",
                "activities": [
                  {
                    "time": "",
                    "description": " minimum 30 word description",
                    "Hotels":"add there near hotels",
                    "TRANSFER":[provide cab ,bus etc]
                   
                     "distance":[give distance to one location to another location],
                     "notes": " minimum 15 word notes",
                     "places":[ monuments name],
                  }
                ]
              }
            ],
            "notes": ""
          } data give this format please dont give notice`
        }]
      }]
    };

    try {
      const response = await fetch(`${url}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data && data.candidates && data.candidates.length > 0) {
        const jsonString = data.candidates[0].content.parts[0].text.replace(/```json\n|\n```/g, '');
        const tripData = JSON.parse(jsonString);
        setLoading(false)
        // console.log(tripData,"popop")
        navigate("/itinerary", { state: tripData });



      } else {
        console.error("No response received from the API.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }


  };






  return (
    <div className=" bg-gray-100  maincontainer relative p-[30px] shadow-md">

      <div className="flex justify-center  items-center mx-auto relative z-10 ">
        <div className="w-[30%] shadow-md p-5 h-[100vh] bg-gradient-to-r from-[#0172c2] to-[#02dcff]  rounded-l-lg">
          <div className="w-[100%] mx-auto ">
            <Header />
            <TripForm fetchItinerary={fetchItinerary} />
          </div>

        </div>

        <img src={bg} className=" w-[70%] object-fill h-[100vh]" alt="not found" />

      </div>
      <Loader visible={loading} />


      {/*      
      {itineraryData && <Itinerary itineraryData={itineraryData} />} */}



    </div>
  );
}

export default App;