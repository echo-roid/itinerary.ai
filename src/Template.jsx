import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import { useParams } from "react-router-dom";
import { FaPlane, FaPlaneDeparture, FaStar, FaRegStar, FaCar, FaUtensils, FaHotel } from "react-icons/fa";


const Banner = ({ updatedItinerary }) => {
  if (!updatedItinerary?.destinationImage || updatedItinerary.destinationImage.length < 6) {
    return null;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="w-full">
      <section>
        <div className="relative flex gap-5 p-5">
          <div className="w-[40%] relative">
            <img
              src={updatedItinerary.destinationImage[1]}
              className="w-full h-[320px] object-cover rounded-lg"
              alt="Main Banner"
            />
          </div>
          <div className="w-[35%] flex flex-col gap-5">
            <div className="flex gap-5">
              {[2, 3].map((index) => (
                <div key={index} className="w-[50%] relative">
                  <img
                    src={updatedItinerary.destinationImage[index]}
                    className="w-full h-[150px] object-cover rounded-lg"
                    alt={`Image ${index}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-5">
              {[4, 6].map((index) => (
                <div key={index} className="w-[50%] relative">
                  <img
                    src={updatedItinerary.destinationImage[index]}
                    className="w-full h-[150px] object-cover rounded-lg"
                    alt={`Image ${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-[25%] relative">
            <img
              src={updatedItinerary.destinationImage[5]}
              className="w-full h-[320px] object-cover rounded-lg"
              alt="Side Image"
            />
          </div>
        </div>
      </section>
      {[7, 8].map((index) => (
        <div key={index} className="relative p-5">
          <img
            src={updatedItinerary.destinationImage[index]}
            className="w-full h-[320px] object-cover rounded-lg"
            alt={`Side Image ${index}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export function TableSummary({ updatedItinerary }) {
  const staynightInput = updatedItinerary.staynight.map((item) => `${item.nights}N ${item.city}`).join(" • ");
  const [datePlan, setDatePlan] = useState([]);

  function getFormattedDate(date) {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }

  const recalculateDates = (startDate, numberOfDays) => {
    const dates = [];
    let currentDate = new Date(startDate);
    for (let i = 0; i < numberOfDays; i++) {
      dates.push(getFormattedDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    const initialDates = recalculateDates(new Date(), updatedItinerary.days?.length || 0);
    setDatePlan(initialDates);
  }, [updatedItinerary.days]);

  return (
    <div className="bg-gray-200 m-2 p-6 rounded-lg h-[400px] overflow-auto shadow-md w-full max-w-3xl mx-auto">
      <div className="mt-4 bg-[#EBCFC0] p-3 rounded-t-lg text-gray-900 font-semibold text-lg">
        <span className="font-bold">{updatedItinerary?.country}</span> -{" "}
        <span className="text-[11px]">{staynightInput}</span>
      </div>

      <div className="bg-white p-4 rounded-b-lg shadow">
        {updatedItinerary.days?.map((day, index) => (
          <div className="grid grid-cols-3 border-b py-3 text-sm items-center" key={index}>
            <div>
              <span className="font-bold">Day {index + 1}</span> <br />
              <span className="text-gray-500">{day?.date ? day?.date : datePlan[index]}</span>
            </div>

            <div className="col-span-2">
              <p>{day?.tripsummary}</p>
              <div className="flex gap-1">
                <FaUtensils className="text-gray-700 text-lg" />
                <FaHotel className="text-gray-700 text-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Policies({ updatedItinerary }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Policies</h2>

      <div className="space-y-4">
        {(updatedItinerary.policies || []).map((policy, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{policy.heading}</h3>
            </div>
            <p className="text-gray-700">{policy.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TripSummary({ updatedItinerary, setActiveTab }) {
  const flightTransfer = 'FLIGHTS & TRANSFERS';
  const hotelInfo = updatedItinerary?.hotels?.length + ' Hotels Suggestion';
  const dayInfo = updatedItinerary?.duration;

  return (
    <div className="bg-blue-50 py-4 flex items-center justify-around text-gray-800 text-sm font-medium">
      <span className="flex items-center space-x-2 ml-4">
        <button className="px-4 py-1 border border-blue-500 text-blue-600 rounded-full font-semibold">
          <span className="text-blue-600 font-bold">{dayInfo}</span> PLAN
        </button>
      </span>

      <span className="flex items-center space-x-2">
        <span className="font-semibold" onClick={() => { setActiveTab("") }}>{flightTransfer}</span>
      </span>

      <span className="flex items-center space-x-2 ml-4">
        <span className="font-semibold" onClick={() => { setActiveTab("hotels") }}>{hotelInfo}</span>
      </span>
    </div>
  );
}

export function PlanContent({ updatedItinerary }) {
  return (
    <>
      {updatedItinerary?.days.map((day, dayIndex) => (
        <div key={dayIndex} className="p-3">
          <div className="flex items-center space-x-3 p-3 sticky top-0 z-10 bg-white">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Day {dayIndex + 1}
            </span>
            <span className="text-lg font-bold text-gray-800">{day?.theme}</span>
          </div>

          {day.activities.map((activity, activityIndex) => (
            <div key={activityIndex} className="bg-white p-4 rounded-lg shadow mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-black mt-2">{activity?.time}</p>
                  {activity.Hotels && <p className="text-gray-600 mt-2">Hotels Suggestion:{activity.Hotels}</p>}
                  <p className="text-gray-600 mt-2">Description {activity.description}</p>
                  {activity.notes && <p className="text-gray-600 mt-2">Notes: {activity.notes}</p>}
                  {activity?.distance && <p className="text-gray-600 mt-2">Distance : {activity?.distance}</p>}
                  {activity?.TRANSFER && <p className="text-gray-600 mt-2">TRANSFER: {activity?.TRANSFER}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {activity?.places?.map((img, index) => (
                  img.imageUrl && (
                    <img key={index} src={img.imageUrl} alt={img?.name} className="rounded-lg shadow-md w-[100%] h-[300px]" />
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export function DayCard({ updatedItinerary }) {
  return (
    <div>
      {updatedItinerary?.hotels?.map((hotel, index) => (
        <div key={index} className="bg-white shadow-lg  rounded-lg overflow-hidden border mb-4">
          <div className="flex  items-center p-3 bg-[#FFD4C4]">
            <span className="bg-[#FF5733] text-white font-bold px-3 py-1 rounded-full text-sm">Day {index + 1}</span>
            <span className="ml-3 text-lg font-bold text-gray-800">{updatedItinerary.destination}</span>
            <span className="ml-3 text-gray-500 text-sm">INCLUDED:</span>
            <div className="ml-2 flex items-center space-x-2 text-gray-600 text-sm">
              <span className="flex items-center"><FaHotel className="mr-1" /> 1 Hotel</span>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center mb-3">
              <FaHotel className="text-gray-700 text-xl mr-2" />
              <span className="text-gray-800 font-bold">{updatedItinerary.destination}</span>
            </div>

            <div className="flex">
              <img
                src={hotel.imageUrl}
                alt={hotel.name || "Hotel Image"}
                className="w-48 h-32 object-cover rounded-lg border"
              />

              <div className="ml-4 flex-1">
                <h3 className="font-bold text-gray-800 text-lg">
                  {hotel.name }
                </h3>

                <h3 className="font-bold text-gray-800 text-[14px]">
                  {hotel.content }
                </h3>
                

                <div className="flex text-yellow-500 text-sm mt-1">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar className="text-gray-300" />
                </div>

                <p className="text-gray-500 text-sm mt-1">
                Location:{hotel.location}
                </p>

                <p className="text-gray-600 text-sm mt-1">
                  📅 {hotel.dates }
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const Itinerary = ({ updatedItinerary, setActiveTab }) => (
  <section className="h-[400px] overflow-auto">
    <TripSummary updatedItinerary={updatedItinerary} setActiveTab={setActiveTab} />
    <PlanContent updatedItinerary={updatedItinerary} />
  </section>
);

export function DayPlan({ updatedItinerary }) {
  const getNextNDays = (startDate, n) => {
    const options = { day: "2-digit", month: "short", weekday: "short" };
    const result = [];

    for (let i = 0; i < n; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      result.push(date.toLocaleDateString("en-GB", options));
    }

    return result;
  };

  const initialStartDate = new Date();
  const dayDates = getNextNDays(initialStartDate, updatedItinerary?.days?.length || 0);

  return (
    <div className="text-gray-800 text-sm font-medium">
      <h2 className="text-lg font-semibold mb-0 pl-[16px]">Day Plan</h2>
      <div className="relative bg-white p-4 mt-2">
        <div className="absolute left-[18.5px] top-[19px] h-[72%] w-[2px] bg-gray-300"></div>
        <ul className="space-y-2">
          {updatedItinerary?.days?.map((day, index) => (
            <li key={index} className="relative flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-[11px]">{day.date || dayDates[index]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Tabs({ setActiveTab, activeTab }) {
  const [linkshareid, setLinkShareId] = useState(false);

  return (
    <div className="border-b border-gray-300 flex justify-between items-start px-5">
      <div className="flex space-x-8">
        {["itinerary", "policies", "summary"].map((tab) => (
          <button
            key={tab}
            className={`relative pb-2 text-lg font-semibold ${activeTab === tab ? "text-blue-600" : "text-gray-700"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
            {activeTab === tab && (
              <div className="absolute left-0 bottom-0 w-full h-1 bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>

    
     
    </div>
  );
}

const TourPackage = ({ updatedItinerary }) => {
  const formattedData = updatedItinerary.staynight.map((item) => `${item.nights}N ${item.city}`).join(" • ");

  return (
    <div className="p-4 bg-white border rounded-lg flex items-center space-x-2 flex-wrap relative z-10">
      <button className="border px-3 py-1 rounded flex items-center space-x-1">
        <span>⚒</span>
        <span>{updatedItinerary.country}</span>
      </button>
      <button className="border px-3 py-1 rounded">{updatedItinerary.people} People Group</button>
      <button className="border px-3 py-1 rounded">{updatedItinerary.duration}</button>
      <p className="text-gray-700 text-lg font-medium">
        <span className="font-semibold text-[12px]">{formattedData}</span>
      </p>
    </div>
  );
};

export function FlightCard() {
  return (
    <>
      <div className="border rounded-lg p-4 shadow-md flex flex-col bg-white w-full max-w-lg">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <FaPlaneDeparture className="text-gray-700" />
          <span>FLIGHT &bull; New Delhi to Zurich</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaPlane className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-700 font-medium">Mon, 11 Aug</p>
              <p className="text-gray-500">New Delhi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <hr className="border-gray-400 flex-1 w-16" />
            <FaPlane className="text-gray-700" />
            <hr className="border-gray-400 flex-1 w-16" />
          </div>
          <div>
            <p className="text-gray-700 font-medium">Mon, 11 Aug</p>
            <p className="text-gray-500">Zurich</p>
          </div>
        </div>
        <div className="mt-3 flex items-center bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-md w-fit">
          <span>&#9888; Tentative Flight</span>
        </div>
        <div className="mt-4 flex justify-between text-gray-700 text-sm">
          <p><strong>Cabin:</strong> 7 kg</p>
          <p><strong>Check-in:</strong> 20 kg</p>
        </div>
      </div>
      
      <div className="border rounded-lg p-4 shadow-md flex flex-col bg-white w-full max-w-lg">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <FaCar className="text-gray-700" />
          <span>TRANSFER &bull; Airport to hotel in Zurich</span>
        </div>
        <div className="flex mt-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Bus Transfer"
            className="w-32 h-20 rounded-lg object-cover"
          />
          <div className="ml-4">
            <p className="text-lg font-bold text-gray-800">Shared Transfer</p>
            <p className="text-gray-600 text-sm">Shared Transfer from Airport to Hotel for Europe Group Departure</p>
            <p className="text-gray-700 mt-2">&#9679; Airport to Hotel</p>
          </div>
        </div>
      </div>
    </>
  );
}

const Template = () => {
 
  const [activeTab, setActiveTab] = useState("itinerary");
  const { id } = useParams();
  
  
   const [updatedItinerary, setUpdatedItinerary] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Assuming you have an API endpoint that takes shareableLink as a parameter
    const fetchItinerary = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace with your API endpoint
        const response = await fetch(`https://itinerary-backend-khaki.vercel.app/itinerary/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setUpdatedItinerary(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id]); // Re-fetch if shareableLink changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!updatedItinerary) {
    return <div>No itinerary found</div>;
  }
  console.log(updatedItinerary)


  return (
    <div className="bg-gray-200 min-h-screen">
      <TourPackage updatedItinerary={updatedItinerary}  />
      <div className="bg-white">
        <Banner updatedItinerary={updatedItinerary} />
        <Tabs setActiveTab={setActiveTab} activeTab={activeTab}  />
      </div>
      <div className="flex mt-5 p-4 pt-0 pr-0 bg-white shadow-md rounded-md mx-5">
        <div className="w-[12%] border-r-[1px] pt-4">
          <DayPlan updatedItinerary={updatedItinerary} />
        </div>
        <div className="w-[88%]">
          {activeTab == "itinerary" ? (
            <Itinerary updatedItinerary={updatedItinerary} setActiveTab={setActiveTab} />
          ) : activeTab == "summary" ? (
            <TableSummary updatedItinerary={updatedItinerary} />
          ) : activeTab == "policies" ? (
            <Policies updatedItinerary={updatedItinerary} />
          ) : activeTab == "hotels" ? (
            <DayCard updatedItinerary={updatedItinerary} />
          ) : (
            <FlightCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default Template;