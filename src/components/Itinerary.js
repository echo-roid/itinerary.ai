import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import bg from "../assets/StevenP.jpg";
import { MdAddBox } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import EditPopup from "./EditPopup";
import AddPopup from "./AddPopup"; // Create this component
// import html2pdf from "html2pdf.js";

function Itinerary() {

  const location = useLocation();
  const itineraryData = location.state;
  const [updatedItinerary, setUpdatedItinerary] = useState(itineraryData);



  // const handleDownloadPDF = () => {
  //   // Select the HTML content to convert
  //   const element = document.getElementById("content-to-pdf");

  //   // Options for the PDF
  //   const options = {
  //     margin: 10,
  //     filename: "document.pdf",
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //   };

  //   // Generate and download the PDF
  //   html2pdf().from(element).set(options).save();
  // };

  useEffect(() => {
    const fetchImages = async () => {
      const access_id = "8pycO0DRNqhKOn4Z__LcZuBQyHUKQjqN_OoOJbC6tp8"
      const updatedDays = await Promise.all(
        itineraryData.days.map(async (day) => {
          const updatedActivities = await Promise.all(
            day.activities.map(async (activity) => {
              const updatedPlaces = await Promise.all(
                activity.places.map(async (place) => {
                  const url = `https://api.unsplash.com/search/photos?page=1&query=${place}&client_id=${access_id}`;

                  try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`Error: ${response.status}`);

                    const data = await response.json();
                    return { name: place, imageUrl: data.results[0]?.urls.small || "" };
                  } catch (error) {
                    console.error("Error fetching image:", error);
                    return { name: place, imageUrl: "" };
                  }
                })
              );

              return { ...activity, places: updatedPlaces };
            })
          );

          return { ...day, activities: updatedActivities };
        })
      );

      setUpdatedItinerary({ ...itineraryData, days: updatedDays });
    };

    fetchImages();
  }, [itineraryData]);


 

  // State for managing the popup and editing data
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(null);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(null);

  // Function to open the edit popup and set the activity to edit
  const handleEditClick = (dayIndex, activityIndex) => {
    setEditingActivity(itineraryData.days[dayIndex].activities[activityIndex]);
    setCurrentDayIndex(dayIndex);
    setCurrentActivityIndex(activityIndex);
    setIsEditPopupOpen(true);

  };

  // Function to open the add popup
  const handleAddClick = (dayIndex, activityIndex) => {
    setCurrentDayIndex(dayIndex);
    setCurrentActivityIndex(activityIndex);
    setIsAddPopupOpen(true);
  };

  // Function to save the edited activity
  const handleSaveEdit = (updatedActivity) => {
    const updatedDays = [...itineraryData.days];
    updatedDays[currentDayIndex].activities[currentActivityIndex] = updatedActivity;
    itineraryData.days = updatedDays;
    setIsEditPopupOpen(false);
  };

  // Function to save the new activity
  const handleSaveAdd = (newActivity) => {
    const updatedDays = [...itineraryData.days];
    updatedDays[currentDayIndex].activities.splice(currentActivityIndex + 1, 0, newActivity); // Add below the current activity
    itineraryData.days = updatedDays;
    setIsAddPopupOpen(false);
  };







  return (
    <>
     <button
        // onClick={handleDownloadPDF}
        className="z-40"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          position: "absolute",
          top: "54px",
        }}
      >
        Download as PDF
      </button>
      <div className="pb-6" id="content-to-pdf">
      <div className="p-3 shadow-md text-white border-l-4 relative overflow-hidden rounded-lg mb-5 afterbox">
        <img src={bg} className="object-cover w-full h-full absolute top-0 left-0" alt="" />
        <div className="relative z-10 py-5">
          <h1 className="text-3xl font-bold text-center mb-6 poppins-extrabold">{itineraryData.tripName}</h1>
          <h3 className="text-xl text-center mb-4 poppins-semibold">Destination: {itineraryData.destination}</h3>
          <p className="text-center mb-4 poppins-semibold">Duration: {itineraryData.duration} {itineraryData.people} People</p>

          <p className="text-center poppins-semibold">Focus: {itineraryData.focus}</p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto">
        {updatedItinerary.days.map((day, dayIndex) => (
          <div key={day.day} className="day bg-white mb-5 rounded-lg rounded-tl-[20px] rounded-tr-[20px] shadow-md overflow-hidden">
            <div className="relative">
              <img src={bg} className="h-[150px] w-full object-cover" alt="not found" />
              <div className="w-[70%] bg-gradient-to-l from-black to-[rgb(24,26,40)] rounded-xl py-4 absolute left-0 right-0 mx-auto bottom-[-50px] flex justify-center shadow-md flex-col items-center poppins-semibold text-2xl">

                <h3 className="mb-4 text-white poppins-extrabold">Day {day.day}</h3>
                <h2 className="text-2xl text-white font-bold poppins-extrabold">{day.theme}</h2>
              </div>
            </div>

            <div className="p-6 mt-12">
              {day.activities.map((activity, activityIndex) => (

                <div key={activityIndex} className="poppins-medium time-slot p-4 mb-4 border-l-4 bg-gradient-to-l from-black to-[rgb(24,26,40)] border-[#8ba79b] bg-pink-50 text-white rounded-lg">
                  <div>
                    <div>
                      <strong>{activity.time}:</strong> {activity.description}
                      <div className="flex gap-2 mt-2">
                        <MdAddBox
                          className="cursor-pointer"
                          onClick={() => handleAddClick(dayIndex, activityIndex)}
                        />
                        <FaEdit
                          className="cursor-pointer"
                          onClick={() => handleEditClick(dayIndex, activityIndex)}
                        />
                      </div>
                      <div className="poppins-medium mt-2 text-sm text-gray-600">
                        {
                          activity.Hotels && <>
                          Hotels:{activity.Hotels}
                          </>
                        }
                        
                      </div>
                      {activity.description && <div className="notes poppins-medium mt-2 text-sm text-gray-600">Description: {activity.description}</div>}
                      
                      {activity.notes && <div className="notes poppins-medium mt-2 text-sm text-gray-600">Notes: {activity.notes}</div>}
                    </div>

                    <div className="flex gap-3 p-2 justify-start ps-0">

                      {
                        activity.places?.map((elem) => 
                            <img className="w-[200px] h-[200px] object-cover" src={elem?.imageUrl} alt={elem?.name}/>
                        )
                      }



                    </div>
                  </div>


                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Popup */}
      {isEditPopupOpen && (
        <EditPopup
          activity={editingActivity}
          onSave={handleSaveEdit}
          onClose={() => setIsEditPopupOpen(false)}
        />
      )}

      {/* Add Popup */}
      {isAddPopupOpen && (
        <AddPopup
          onSave={handleSaveAdd}
          onClose={() => setIsAddPopupOpen(false)}
        />
      )}
    </div>
    </>
   
  );
}

export default Itinerary;