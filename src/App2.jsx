import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import { FaShare } from "react-icons/fa";
import { FaPlane, FaPlaneDeparture, FaStar, FaRegStar,FaCar ,FaRegSave,FaUtensils, FaHotel, FaEdit, FaSave, FaTimes, FaTrash, FaPlus, FaArrowUp, FaArrowDown,FaTrashAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";





const EditForm = ({ data, onSave, onCancel }) => {
  const [formData, setFormData] = useState(data);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image uploads
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const updatedPlaces = [...formData.places];
        updatedPlaces[index].imageUrl = event.target.result;
        setFormData({ ...formData, places: updatedPlaces });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="space-y-4">
        {/* Theme */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Theme</label>
          <input
            type="text"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div> */}

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Hotels */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Hotels</label>
          <input
            type="text"
            name="Hotels"
            value={formData.Hotels}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Distance</label>
          <input
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Transfer */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Transfer</label>
          <input
            type="text"
            name="TRANSFER"
            value={formData.TRANSFER}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Places and Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Places</label>
          {formData.places.map((place, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                value={place.name}
                onChange={(e) => {
                  const updatedPlaces = [...formData.places];
                  updatedPlaces[index].name = e.target.value;
                  setFormData({ ...formData, places: updatedPlaces });
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
                className="mt-2"
              />
              {place.imageUrl && (
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Save
        </button>
      </div>
    </form>
  );
};
// 
const Banner = ({ updatedItinerary, onImageUpdate ,mainToggleButton}) => {
  // Check if destinationImage exists and has at least 6 images
  if (!updatedItinerary?.destinationImage || updatedItinerary.destinationImage.length < 6) {
    return null; // Prevents rendering if images are missing
  }

  // Handle image upload for a specific index
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const updatedImages = [...updatedItinerary.destinationImage];
        updatedImages[index] = event.target.result; // Update the image at the specified index
        onImageUpdate(updatedImages); // Pass the updated images to the parent component
      };
      reader.readAsDataURL(file);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="w-full">
      {/* First Frame */}
      <section >
        <div className="relative flex gap-5 p-5">
        <div className="w-[40%] relative">
          <img
            src={updatedItinerary.destinationImage[1]}
            className="w-full h-[320px] object-fill rounded-lg"
            alt="Main Banner"
          />
          {
            mainToggleButton &&<label className="absolute top-2 right-2 bg-white p-1 rounded-full cursor-pointer">
            <FaEdit className="text-blue-600" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 1)}
              className="hidden"
            />
          </label>
          }
          
        </div>
  
        {/* Middle Section - 35% */}
        <div className="w-[35%] flex flex-col gap-5">
          <div className="flex gap-5">
            {[2, 3].map((index) => (
              <div key={index} className="w-[50%] relative">
                <img
                  src={updatedItinerary.destinationImage[index]}
                  className="w-full h-[150px] object-fill rounded-lg"
                  alt={`Image ${index}`}
                />
                {
                  mainToggleButton && <label className="absolute top-2 right-2 bg-white p-1 rounded-full cursor-pointer">
                  <FaEdit className="text-blue-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="hidden"
                  />
                </label>
                }
                
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
                  {
                    mainToggleButton && <label className="absolute top-2 right-2 bg-white p-1 rounded-full cursor-pointer">
                    <FaEdit className="text-blue-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      className="hidden"
                    />
                  </label>
                  }
               
              </div>
            ))}
          </div>
        </div>
  
        {/* Side Large Image - 25% */}
        <div className="w-[25%] relative">
          <img
            src={updatedItinerary.destinationImage[5]}
            className="w-full h-[320px] object-cover rounded-lg"
            alt="Side Image"
          />

          {
              mainToggleButton &&   <label className="absolute top-2 right-2 bg-white p-1 rounded-full cursor-pointer">
              <FaEdit className="text-blue-600" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 5)}
                className="hidden"
              />
            </label>
          }
        
        </div>
        </div>
        {/* Main Large Image - 40% */}
       
      </section>
  
      {/* Second Frame */}
      {[7, 8].map((index) => (
        <div key={index} className="relative  p-5">
          <img
            src={updatedItinerary.destinationImage[index]}
            className="w-full h-[320px] object-cover rounded-lg"
            alt={`Side Image ${index}`}
          />
          {
             mainToggleButton && <label className="absolute top-2 right-2 bg-white p-1 rounded-full cursor-pointer">
             <FaEdit className="text-blue-600" />
             <input
               type="file"
               accept="image/*"
               onChange={(e) => handleImageUpload(e, index)}
               className="hidden"
             />
           </label>
          }
          
        </div>
      ))}
    </Slider>
  )}



export function TableSummary({ updatedItinerary, onUpdate,mainToggleButton }) {
  const [staynightInput, setStaynightInput] = useState(
    updatedItinerary.staynight.map((item) => `${item.nights}N ${item.city}`).join(" • ")
  );

  const [datePlan, setDatePlan] = useState([]);
  const [editingStaynight, setEditingStaynight] = useState(false);
  const [editingDayIndex, setEditingDayIndex] = useState(null);
  const [editedTripSummary, setEditedTripSummary] = useState("");
  const [editedDate, setEditedDate] = useState("");

  // Format dates for the itinerary
  function getFormattedDate(date) {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }

  // Recalculate dates when shifting days
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

  // Handle Save Staynight
  const handleSaveStaynight = () => {
    const updatedStaynight = staynightInput.split(" • ").map((item) => {
      const [nights, city] = item.split("N ");
      return [city, parseInt(nights)];
    });

    const updatedItineraryData = { ...updatedItinerary, staynight: updatedStaynight };
    onUpdate(updatedItineraryData);
    setEditingStaynight(false);
  };

  // Handle Save Trip Summary & Date
  const handleSaveDayDetails = (dayIndex) => {
    const updatedDays = [...updatedItinerary.days];
    updatedDays[dayIndex].tripsummary = editedTripSummary;

    if (editedDate) {
      const newStartDate = new Date(editedDate);
      if (!isNaN(newStartDate.getTime())) {
        const updatedDatePlan = recalculateDates(newStartDate, updatedDays.length);
        setDatePlan(updatedDatePlan);
      }
    }

    const updatedItineraryData = { ...updatedItinerary, days: updatedDays };
    onUpdate(updatedItineraryData);
    setEditingDayIndex(null);
  };

  // Move Day Up
  const moveDayUp = (index) => {
    if (index === 0) return; // First item can't move up
    const updatedDays = [...updatedItinerary.days];
    [updatedDays[index], updatedDays[index - 1]] = [updatedDays[index - 1], updatedDays[index]];
    onUpdate({ ...updatedItinerary, days: updatedDays });
  };

  // Move Day Down
  const moveDayDown = (index) => {
    if (index === updatedItinerary.days.length - 1) return; // Last item can't move down
    const updatedDays = [...updatedItinerary.days];
    [updatedDays[index], updatedDays[index + 1]] = [updatedDays[index + 1], updatedDays[index]];
    onUpdate({ ...updatedItinerary, days: updatedDays });
  };

  return (
    <div className="bg-gray-200 m-2 p-6 rounded-lg h-[400px] overflow-auto shadow-md w-full max-w-3xl mx-auto">
      {/* Stay Section */}
      <div className="mt-4 bg-[#EBCFC0] p-3 rounded-t-lg text-gray-900 font-semibold text-lg">
        <span className="font-bold">{updatedItinerary?.country}</span> -{" "}
        {editingStaynight ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={staynightInput}
              onChange={(e) => setStaynightInput(e.target.value)}
              className="border border-gray-300 rounded-md p-1 text-[11px]"
            />
            <button onClick={handleSaveStaynight} className="text-green-600 hover:text-green-800">
              <FaSave size={14} />
            </button>
            <button onClick={() => setEditingStaynight(false)} className="text-red-600 hover:text-red-800">
              <FaTimes size={14} />
            </button>
          </div>
        ) : (
          <span className="text-[11px]">
            {staynightInput}
            {
              mainToggleButton && <button onClick={() => setEditingStaynight(true)} className="text-blue-600 hover:text-blue-800 ml-2">
              <FaEdit size={14} />
            </button>
            }
           
          </span>
        )}
      </div>

      {/* Itinerary Table */}
      <div className="bg-white p-4 rounded-b-lg shadow">
        {updatedItinerary.days?.map((day, index) => (
          <div className="grid grid-cols-3 border-b py-3 text-sm items-center" key={index}>
            {/* Date & Day */}
            <div>
              {editingDayIndex === index ? (
                <div className="flex flex-col space-y-2">
                  <input
                    type="date"
                    value={editedDate}
                    onChange={(e) => setEditedDate(e.target.value)}
                    className="border border-gray-300 rounded-md p-1"
                  />
                  <span className="font-bold">Day {index + 1}</span>
                </div>
              ) : (
                <>
                  <span className="font-bold">Day {index + 1}</span> <br />
                  <span className="text-gray-500">{day?.date ? day?.date : datePlan[index]}</span>
                </>
              )}
            </div>

            {/* Trip Summary */}
            <div className="col-span-2">
              {editingDayIndex === index ? (
                <div className="flex flex-col space-y-2">
                  <textarea
                    value={editedTripSummary}
                    onChange={(e) => setEditedTripSummary(e.target.value)}
                    className="border border-gray-300 rounded-md p-1 w-full"
                  />
                  <div className="flex space-x-2">
                    <button onClick={() => handleSaveDayDetails(index)} className="text-green-600 hover:text-green-800">
                      <FaSave size={14} />
                    </button>
                    <button onClick={() => setEditingDayIndex(null)} className="text-red-600 hover:text-red-800">
                      <FaTimes size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p>{day?.tripsummary}</p>
                  <div className="flex gap-1">
                    <FaUtensils className="text-gray-700 text-lg" />
                    <FaHotel className="text-gray-700 text-lg" />
                  </div>
                  {
                    mainToggleButton &&  <button
                    onClick={() => {
                      setEditingDayIndex(index);
                      setEditedTripSummary(day.tripsummary || "");
                      setEditedDate(datePlan[index]);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit size={14} />
                  </button>
                  }
                 
                </>
              )}
            </div>

            {/* Move Up / Down Buttons */}
            <div className="flex space-x-2">
              <button onClick={() => moveDayUp(index)} disabled={index === 0} className="text-gray-600 hover:text-black">
                <FaArrowUp size={14} />
              </button>
              <button
                onClick={() => moveDayDown(index)}
                disabled={index === updatedItinerary.days.length - 1}
                className="text-gray-600 hover:text-black"
              >
                <FaArrowDown size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function Policies({ updatedItinerary, onUpdate }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ heading: "", paragraph: "" });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new policy
  const handleAddPolicy = () => {
    if (formData.heading.trim() && formData.paragraph.trim()) {
      const updatedPolicies = [
        ...(updatedItinerary.policies || []),
        { heading: formData.heading, paragraph: formData.paragraph },
      ];
      onUpdate({ ...updatedItinerary, policies: updatedPolicies });
      setFormData({ heading: "", paragraph: "" });
    }
  };

  // Edit a policy
  const handleEditPolicy = (index) => {
    setEditingIndex(index);
    setFormData(updatedItinerary.policies[index]); // Populate the form with existing values
  };

  // Save edited policy
  const handleSavePolicy = () => {
    if (formData.heading.trim() && formData.paragraph.trim()) {
      const updatedPolicies = [...updatedItinerary.policies];
      updatedPolicies[editingIndex] = { ...formData };

      onUpdate({ ...updatedItinerary, policies: updatedPolicies });
      setEditingIndex(null);
      setFormData({ heading: "", paragraph: "" });
    }
  };

  // Delete a policy
  const handleDeletePolicy = (index) => {
    const updatedPolicies = updatedItinerary.policies.filter((_, i) => i !== index);
    onUpdate({ ...updatedItinerary, policies: updatedPolicies });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Policies</h2>

      {/* Add/Edit Policy Form */}
      <div className="mb-6">
        <input
          type="text"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          placeholder="Enter policy heading"
          className="border border-gray-300 rounded-md p-2 w-full mb-2"
        />
        <textarea
          name="paragraph"
          value={formData.paragraph}
          onChange={handleChange}
          placeholder="Enter policy paragraph"
          className="border border-gray-300 rounded-md p-2 w-full mb-2"
        />
        <div className="flex gap-1">
        <button
          onClick={editingIndex !== null ? handleSavePolicy : handleAddPolicy}
          className="bg-blue-600 text-white flex gap-1 items-center px-2 text-[11px] py-2 rounded-md hover:bg-blue-700"
        >
          {editingIndex !== null ? <FaSave /> : <FaPlus />}
          {editingIndex !== null ? " Save Policy" : " Add Policy"}
        </button>
        {editingIndex !== null && (
          <button
            onClick={() => {
              setEditingIndex(null);
              setFormData({ heading: "", paragraph: "" });
            }}
            className="bg-gray-500 text-white px-4 text-[11px]  flex gap-1 items-center py-2 rounded-md hover:bg-gray-600 ml-2"
          >
            <FaTimes /> Cancel
          </button>
        )}
        </div>
      
      </div>

      {/* Display Policies */}
      <div className="space-y-4">
        {(updatedItinerary.policies || []).map((policy, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{policy.heading}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditPolicy(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeletePolicy(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-gray-700">{policy.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
}





export function TripSummary({ updatedItinerary, setActiveTab ,mainToggleButton}) {
  // State for tracking editable fields
  const [isEditingFlightTransfer, setIsEditingFlightTransfer] = useState(false);
  const [isEditingHotelInfo, setIsEditingHotelInfo] = useState(false);
  const [isEditingDayInfo, setIsEditingDayInfo] = useState(false);
  
  const [flightTransfer, setFlightTransfer] = useState('FLIGHTS & TRANSFERS'); // Default value
  const [hotelInfo, setHotelInfo] = useState( updatedItinerary?.Hotels?.length + ' Hotels Guggestion'); // Default value
  const [dayInfo, setDayInfo] = useState(updatedItinerary?.duration); // Default value



  
  // Handle Edit click for Flight & Transfer Info
  const handleEditFlightTransferClick = () => {
    setIsEditingFlightTransfer(true);
  };

  // Handle Edit click for Hotel Info
  const handleEditHotelClick = () => {
    setIsEditingHotelInfo(true);
  };

  // Handle Edit click for Day Info
  const handleEditDayClick = () => {
    setIsEditingDayInfo(true);
  };

  // Handle change in Flight & Transfer Info
  const handleFlightTransferChange = (e) => {
    setFlightTransfer(e.target.value);
  };

  // Handle change in Hotel Info
  const handleHotelInfoChange = (e) => {
    setHotelInfo(e.target.value);
  };

  // Handle change in Day Info
  const handleDayInfoChange = (e) => {
    setDayInfo(e.target.value);
  };

  // Handle save on blur or when 'Enter' is pressed for Flight & Transfer Info
  const handleFlightTransferBlur = () => {
    setIsEditingFlightTransfer(false);
  };

  // Handle save on blur or when 'Enter' is pressed for Hotel Info
  const handleHotelInfoBlur = () => {
    setIsEditingHotelInfo(false);
  };

  // Handle save on blur or when 'Enter' is pressed for Day Info
  const handleDayInfoBlur = () => {
    setIsEditingDayInfo(false);
  };

  // Handle pressing "Enter" to save for Flight & Transfer Info
  const handleFlightTransferKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditingFlightTransfer(false);
    }
  };

  // Handle pressing "Enter" to save for Hotel Info
  const handleHotelInfoKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditingHotelInfo(false);
    }
  };

  // Handle pressing "Enter" to save for Day Info
  const handleDayInfoKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditingDayInfo(false);
    }
  };

  return (
    <div className="bg-blue-50 py-4 flex items-center justify-around text-gray-800 text-sm font-medium">
      {/* Blue Outlined Button */}

      <span className="flex items-center space-x-2 ml-4">
        {isEditingDayInfo ? (
          <input
            type="text"
            value={dayInfo}
            onChange={handleDayInfoChange}
            onBlur={handleDayInfoBlur}
            onKeyDown={handleDayInfoKeyPress}
            className="border-b border-blue-500 px-2 py-1 text-gray-700 focus:outline-none"
            autoFocus
          />
        ) : (
          <>
            <button className="px-4 py-1 border border-blue-500 text-blue-600 rounded-full font-semibold">
        <span className="text-blue-600 font-bold">{dayInfo}</span> PLAN
      </button>
      {
        mainToggleButton && <button onClick={handleEditDayClick} className="text-blue-600 hover:text-blue-800">
        <FaEdit size={16} />
      </button>
      }
            
           
          </>
        )}
      </span>
     

      {/* Editable Flight & Transfer Info */}
      <span className="flex items-center space-x-2">
        {isEditingFlightTransfer ? (
          <input
            type="text"
            value={flightTransfer}
            onChange={handleFlightTransferChange}
            onBlur={handleFlightTransferBlur}
            onKeyDown={handleFlightTransferKeyPress}
            className="border-b border-blue-500 px-2 py-1 text-gray-700 focus:outline-none"
            autoFocus
          />
        ) : (
          <>
            <span className="font-semibold" onClick={() => { setActiveTab("") }}>{flightTransfer}</span>
            {
              mainToggleButton &&   <button onClick={handleEditFlightTransferClick} className="text-blue-600 hover:text-blue-800">
              <FaEdit size={16} />
            </button>
            }
          
          </>
        )}
      </span>

      {/* Editable Hotel Info */}
      <span className="flex items-center space-x-2 ml-4">
        {isEditingHotelInfo ? (
          <input
            type="text"
            value={hotelInfo}
            onChange={handleHotelInfoChange}
            onBlur={handleHotelInfoBlur}
            onKeyDown={handleHotelInfoKeyPress}
            className="border-b border-blue-500 px-2 py-1 text-gray-700 focus:outline-none"
            autoFocus
          />
        ) : (
          <>
            <span className="font-semibold" onClick={() => { setActiveTab("hotels") }}>{hotelInfo}</span>
            {mainToggleButton&&   <button onClick={handleEditHotelClick} className="text-blue-600 hover:text-blue-800">
              <FaEdit size={16} />
            </button>}
          
          </>
        )}
      </span>

      {/* Editable Day Info */}
     
    </div>
  );
}


export function PlanContent({ updatedItinerary, setUpdatedItinerary, onThemeEdit,mainToggleButton }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingActivityIndex, setEditingActivityIndex] = useState(null);
  const [editingThemeIndex, setEditingThemeIndex] = useState(null);
  const [themeInput, setThemeInput] = useState("");
  const [isAddDayPopupOpen, setIsAddDayPopupOpen] = useState(false);
  const [newDayData, setNewDayData] = useState({
    theme: "",
    tripsummary: "",
    activities: [{
      "time": "",
      "description": "",
      "Hotels": "",
      "TRANSFER": "",
      "distance": "",
      "notes": "",
      "places": [{ name: "", imageUrl: "" }],
    }],
  });
  
  // Handle edit button click for activities
  const handleEdit = (dayIndex, activityIndex) => {
    setEditingIndex(dayIndex);
    setEditingActivityIndex(activityIndex);
  };

  // Handle edit button click for theme
  const handleThemeEditClick = (dayIndex, currentTheme) => {
    setEditingThemeIndex(dayIndex);
    setThemeInput(currentTheme);
  };

  // Save updated activity data
  const handleSave = (updatedData) => {
    const updatedDays = [...updatedItinerary.days];
    updatedDays[editingIndex].activities[editingActivityIndex] = updatedData;
    setUpdatedItinerary({ ...updatedItinerary, days: updatedDays });
    setEditingIndex(null);
    setEditingActivityIndex(null);
  };

  // Save updated theme data
  const handleThemeSave = (dayIndex) => {
    onThemeEdit(dayIndex, themeInput);
    setEditingThemeIndex(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingIndex(null);
    setEditingActivityIndex(null);
    setEditingThemeIndex(null);
  };

  // Open the "Add Day" popup
  const openAddDayPopup = () => {
    setIsAddDayPopupOpen(true);
  };

  // Close the "Add Day" popup
  const closeAddDayPopup = () => {
    setIsAddDayPopupOpen(false);
    setNewDayData({
      theme: "",
      tripsummary: "",
      activities: [{
        "time": "",
        "description": "",
        Hotels: [{"name":"" ,"img":"","rating":"" ,"content":"", "time":""}],
        "TRANSFER": "",
        "distance": "",
        "notes": "",
        "places": [{ name: "", imageUrl: "" }],
      }],
    }); // Reset form data
  };

  // Handle form input changes
  const handleNewDayInputChange = (e) => {
    const { name, value } = e.target;
    setNewDayData({ ...newDayData, [name]: value });
  };

  // Handle form submission
  const handleAddDaySubmit = (e) => {
    e.preventDefault();

    // Validate the form data
    if (!newDayData.theme.trim()) {
      alert("Please enter a theme for the day.");
      return;
    }

    // Add the new day to the itinerary
    const updatedDays = [...updatedItinerary.days, newDayData];

    const durationValue = updatedDays.length;
    setUpdatedItinerary({ ...updatedItinerary, days: updatedDays, duration: durationValue });

    // Close the popup and reset the form
    closeAddDayPopup();
  };

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;

    setNewDayData((prevState) => {
      const updatedActivities = [...prevState.activities];
      updatedActivities[index] = {
        ...updatedActivities[index],
        [field]: value,
      };
      return {
        ...prevState,
        activities: updatedActivities,
      };
    });
  };

  const handlePlaceChange = (e, activityIndex, placeIndex, field) => {
    const { value } = e.target;

    setNewDayData((prevState) => {
      const updatedActivities = [...prevState.activities];
      updatedActivities[activityIndex].places[placeIndex] = {
        ...updatedActivities[activityIndex].places[placeIndex],
        [field]: value,
      };

      return {
        ...prevState,
        activities: updatedActivities,
      };
    });
  };

  // Function to add more places to an activity
  const handleAddMorePlace = (activityIndex) => {
    setNewDayData((prevState) => {
      const updatedActivities = [...prevState.activities];

      // Add a new place object with empty values to the selected activity
      updatedActivities[activityIndex].places.push({
        name: "",
        imageUrl: "",
      });

      return {
        ...prevState,
        activities: updatedActivities,
      };
    });
  };

  // Add Activity functionality
  const handleAddActivity = () => {
    setNewDayData((prevState) => {
      const updatedActivities = [...prevState.activities, {
        time: "",
        description: "",
        Hotels: [{"name":"" ,"img":"","rating":"" ,"content":"", "time":""}],
        TRANSFER: "",
        distance: "",
        notes: "",
        places: [{ name: "", imageUrl: "" }],
      }];
      
      return { ...prevState, activities: updatedActivities };
    });
  };

  // Move day up
  const moveDayUp = (index) => {
    if (index > 0) {
      const updatedDays = [...updatedItinerary.days];
      const dayToMove = updatedDays.splice(index, 1)[0];
      updatedDays.splice(index - 1, 0, dayToMove);
      setUpdatedItinerary({ ...updatedItinerary, days: updatedDays });
    }
  };

  // Move day down
  const moveDayDown = (index) => {
    if (index < updatedItinerary.days.length - 1) {
      const updatedDays = [...updatedItinerary.days];
      const dayToMove = updatedDays.splice(index, 1)[0];
      updatedDays.splice(index + 1, 0, dayToMove);
      setUpdatedItinerary({ ...updatedItinerary, days: updatedDays });
    }
  };

  // Function to delete an activity
  const handleDeleteActivity = (dayIndex, activityIndex) => {
    const updatedDays = [...updatedItinerary.days];
    updatedDays[dayIndex].activities.splice(activityIndex, 1); // Remove the activity
    setUpdatedItinerary({ ...updatedItinerary, days: updatedDays });
  };

  // Function to delete an entire day
  const handleDeleteDay = (dayIndex) => {
    const updatedDays = [...updatedItinerary.days];
    updatedDays.splice(dayIndex, 1); // Remove the entire day
    setUpdatedItinerary({ ...updatedItinerary, days: updatedDays });
  };

  return (
    <>
      {/* Add Day Button */}
      <div className="flex justify-end p-1">
        {
              mainToggleButton &&  <button
              onClick={openAddDayPopup}
              className="bg-blue-600 text-white text-[12px] px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <FaPlus className="text-[12px]" />
              <span>Add Day</span>
            </button>
        }
       
      </div>

      {/* Add Day Popup */}
      {isAddDayPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md h-[300px] overflow-auto z-50">
            <h2 className="text-xl font-bold mb-4">Add New Day</h2>
            <form onSubmit={handleAddDaySubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Theme</label>
                <input
                  type="text"
                  name="theme"
                  value={newDayData.theme}
                  onChange={handleNewDayInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>

              {/* Activity Input Fields */}
              {
                newDayData.activities.map((activity, index) => (
                  <div key={index} className="mb-6">

                    {/* Time Input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Time</label>
                      <textarea
                        name="time"
                        value={activity.time}
                        onChange={(e) => handleInputChange(e, index, "time")}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Enter activity time"
                        required
                      />
                    </div>

                    {/* Description Input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={activity.description}
                        onChange={(e) => handleInputChange(e, index, "description")}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Enter description of the activity"
                        required
                      />
                    </div>

                    {/* Hotels Input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Hotels</label>
                      <textarea
                        name="Hotels"
                        value={activity.Hotels}
                        onChange={(e) => handleInputChange(e, index, "Hotels")}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Enter hotels"
                        required
                      />
                    </div>

                    {/* Transfer Input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Transfer</label>
                      <textarea
                        name="TRANSFER"
                        value={activity.TRANSFER}
                        onChange={(e) => handleInputChange(e, index, "TRANSFER")}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Enter transfer details"
                        required
                      />
                    </div>

                    {/* Notes Input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <textarea
                        name="notes"
                        value={activity.notes}
                        onChange={(e) => handleInputChange(e, index, "notes")}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Enter additional notes"
                        required
                      />
                    </div>

                    {/* Places Inputs */}
                    {activity.places.map((place, placeIndex) => (
                      <div key={placeIndex} className="mb-4">
                        <h4 className="text-lg font-medium text-gray-700">Place {placeIndex + 1}</h4>

                        {/* Place Name Input */}
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                          <input
                            type="text"
                            value={place.name}
                            onChange={(e) => handlePlaceChange(e, index, placeIndex, "name")}
                            className="border border-gray-300 rounded-md p-2 w-full"
                            placeholder="Enter place name"
                            required
                          />
                        </label>

                        {/* Place Image URL Input */}
                        <label className="block text-sm font-medium text-gray-700 mt-2">
                          Image URL
                          <input
                            type="text"
                            value={place.imageUrl}
                            onChange={(e) => handlePlaceChange(e, index, placeIndex, "imageUrl")}
                            className="border border-gray-300 rounded-md p-2 w-full"
                            placeholder="Enter image URL"
                            required
                          />
                        </label>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleAddMorePlace(index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    >
                      Add More Places
                    </button>

                  </div>
                ))
              }

              {/* Button to add new Activity */}
              <button
                type="button"
                onClick={handleAddActivity}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Add Activity
              </button>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeAddDayPopup}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Add Day
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Existing Itinerary */}
      {updatedItinerary?.days.map((day, dayIndex) => (
        <div key={dayIndex} className="p-3">
          <div className="flex items-center space-x-3 p-3 sticky top-0 z-10 bg-white">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Day {dayIndex + 1}
            </span>
            {editingThemeIndex === dayIndex ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={themeInput}
                  onChange={(e) => setThemeInput(e.target.value)}
                  onBlur={() => handleThemeSave(dayIndex)}
                  onKeyDown={(e) => e.key === "Enter" && handleThemeSave(dayIndex)}
                  autoFocus
                  className="border border-gray-300 rounded-md p-1"
                />
                <button onClick={() => setEditingThemeIndex(null)} className="text-red-600 hover:text-red-800">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span className="text-lg font-bold text-gray-800">{day?.theme}</span>
                {
                  mainToggleButton &&   <button onClick={() => handleThemeEditClick(dayIndex, day.theme)} className="text-blue-600 hover:text-blue-800">
                  <FaEdit size={18} />
                </button>
                }
              
              </>
            )}
              <div>
                {
                    mainToggleButton &&  <div className="ml-auto">
                    <button
                      onClick={() => moveDayUp(dayIndex)}
                      disabled={dayIndex === 0}
                      className="bg-gray-300 text-gray-600 px-2 py-1 rounded-md mr-2 hover:bg-gray-400 disabled:opacity-50"
                    >
                      Move Up
                    </button>
                    <button
                      onClick={() => moveDayDown(dayIndex)}
                      disabled={dayIndex === updatedItinerary.days.length - 1}
                      className="bg-gray-300 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-400 disabled:opacity-50"
                    >
                      Move Down
                    </button>
                    {/* Delete Day Button */}
                    <button
                      onClick={() => handleDeleteDay(dayIndex)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md ml-2 hover:bg-red-600"
                    >
                      Delete Day
                    </button>
                  </div>
                }
             
              </div>
             
            
           
          </div>

          {day.activities.map((activity, activityIndex) => (
            <div key={activityIndex} className="bg-white p-4 rounded-lg shadow mb-3">
              {editingIndex === dayIndex && editingActivityIndex === activityIndex ? (
                <EditForm data={activity} onSave={handleSave} onCancel={handleCancel} />
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-black mt-2">{activity?.time}</p>
                      {activity.Hotels && <p className="text-gray-600 mt-2">Hotels Suggestion:{activity.Hotels}</p>}
                      <p className="text-gray-600 mt-2">Description {activity.description}</p>
                      {activity.notes && <p className="text-gray-600 mt-2">Notes: {activity.notes}</p>}
                      {activity?.distance && <p className="text-gray-600 mt-2">Distance : {activity?.distance}</p>}
                      {activity?.TRANSFER && <p className="text-gray-600 mt-2">TRANSFER: {activity?.TRANSFER}</p>}
                    </div>
                    <div className="flex space-x-2">
                      {
                        mainToggleButton &&  <button onClick={() => handleEdit(dayIndex, activityIndex)} className="text-blue-600 hover:text-blue-800">
                        <FaEdit size={18} />
                      </button>
                      }
                     
                      {/* Delete Activity Button */}
                      {
                        mainToggleButton &&  <button
                        onClick={() => handleDeleteActivity(dayIndex, activityIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash size={18} />
                      </button>
                      }
                     
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {activity?.places?.map((img, index) => (
                      img.imageUrl && (
                        <img key={index} src={img.imageUrl} alt={img?.name} className="rounded-lg shadow-md w-[100%] h-[300px]" />
                      )
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}






function EditHotelModal({ hotel, isOpen, onClose, onSave }) {
  const [newHotelData, setNewHotelData] = useState(hotel);

  // Ensure that newHotelData is updated when the hotel prop changes
  useEffect(() => {
    setNewHotelData(hotel);
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHotelData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(newHotelData); // Pass the updated hotel data back
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white p-6 rounded-lg w-1/3 h-[300px] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Edit Hotel</h2>

        {/* Form to edit hotel details */}
        <div className="mb-4">
          <label className="block text-sm">Hotel Name</label>
          <input
            type="text"
            name="name"
            value={newHotelData?.name || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Location</label>
          <input
            type="text"
            name="location"
            value={newHotelData?.location || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Dates</label>
          <input
            type="text"
            name="dates"
            value={newHotelData?.dates || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Rating</label>
          <input
            type="text"
            name="rating"
            value={newHotelData?.rating || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={newHotelData?.imageUrl || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Content</label>
          <textarea
            name="content"
            value={newHotelData?.content || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
          />
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export function DayCard({ updatedItinerary, setUpdatedItinerary ,mainToggleButton}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  // Open the modal for editing the selected hotel
  const openEditModal = (hotel) => {
    setEditingHotel(hotel); // Set the hotel being edited
    setIsModalOpen(true); // Open the modal
  };

  // Save the edited hotel data
  const saveHotel = (updatedHotel) => {
    const updatedHotels = updatedItinerary?.Hotels?.map((hotel) =>
      hotel === editingHotel ? updatedHotel : hotel
    );
    setUpdatedItinerary({ ...updatedItinerary, Hotels: updatedHotels });
    setIsModalOpen(false); // Close the modal after saving
  };

  // Remove hotel from the itinerary
  const removeHotel = (hotelIndex) => {
    const updatedHotels = updatedItinerary?.Hotels?.filter((_, index) => index !== hotelIndex);
    setUpdatedItinerary({ ...updatedItinerary, Hotels: updatedHotels });
  };

  // Add a new hotel to the itinerary
  const addHotel = () => {
    const newHotel = {
      name: "New Hotel",
      location: "New Location",
      dates: "TBD",
      rating: "", // New rating field (empty by default)
      imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/333333333.jpg?k=example",
      content: "", // New content field (empty by default)
    };
    setUpdatedItinerary({
      ...updatedItinerary,
      Hotels: [...updatedItinerary?.Hotels, newHotel],
    });
  };

  return (
    <div>
      {/* Add Hotel Button */}
      {
         mainToggleButton &&   <button
         onClick={addHotel}
         className="bg-[#FF5733] m-3 text-white font-bold py-2 px-4 rounded-full mb-4"
       >
         Add Hotel
       </button>
      }
    

      {/* Render hotels */}
      {updatedItinerary?.Hotels?.map((hotel, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden border mb-4">
          {/* Header */}
          <div className="flex items-center p-3 bg-[#FFD4C4]">
            <span className="bg-[#FF5733] text-white font-bold px-3 py-1 rounded-full text-sm">Day {index + 1}</span>
            <span className="ml-3 text-lg font-bold text-gray-800">{updatedItinerary.destination}</span>
            <span className="ml-3 text-gray-500 text-sm">INCLUDED:</span>
            <div className="ml-2 flex items-center space-x-2 text-gray-600 text-sm">
              <span className="flex items-center"><FaHotel className="mr-1" /> 1 Hotel</span>
            </div>
          </div>

          {/* Hotel Section */}
          <div className="p-4">
            <div className="flex items-center mb-3">
              <FaHotel className="text-gray-700 text-xl mr-2" />
              <span className="text-gray-800 font-bold">{updatedItinerary.destination}</span>

              {/* Edit and Delete Icons */}
              <div className="ml-auto flex space-x-2">
                {
                  mainToggleButton &&  <button onClick={() => openEditModal(hotel)} className="text-gray-600 hover:text-gray-800">
                  <FaEdit />
                </button>
                }

                {
                  mainToggleButton &&   <button onClick={() => removeHotel(index)} className="text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
                }
               
              
              </div>
            </div>

            <div className="flex">
              {/* Hotel Image */}
              <img
                src={hotel.imageUrl || "https://cf.bstatic.com/xdata/images/hotel/max1024x768/333333333.jpg?k=example"}
                alt={hotel.name || "Hotel Image"}
                className="w-48 h-32 object-cover rounded-lg border"
              />

              {/* Hotel Details */}
              <div className="ml-4 flex-1">
                <h3 className="font-bold text-gray-800 text-lg">
                  {hotel.name || "Hotel Ibis London Earls Court - Holidays Selections Fd (Or Similar)"}
                </h3>

                {/* Star Ratings */}
                <div className="flex text-yellow-500 text-sm mt-1">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar className="text-gray-300" />
                </div>

                <p className="text-gray-500 text-sm mt-1">
                  {hotel.location || "West Kensington, 4.9 km drive to Buckingham Palace"}
                </p>

                <p className="text-gray-600 text-sm mt-1">
                  📅 {hotel.dates || "16 May - 18 May, 2 Nights"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal for Editing Hotel */}
      <EditHotelModal
        hotel={editingHotel}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveHotel}
      />
    </div>
  );
}



const Itinerary = ({ updatedItinerary, setUpdatedItinerary, onThemeEdit, setActiveTab ,mainToggleButton}) => (
  <section className="h-[400px] overflow-auto">
    <TripSummary updatedItinerary={updatedItinerary} setActiveTab={setActiveTab} mainToggleButton={mainToggleButton}/>
    <PlanContent updatedItinerary={updatedItinerary} setUpdatedItinerary={setUpdatedItinerary} onThemeEdit={onThemeEdit} mainToggleButton={mainToggleButton}/>
  </section>
);

export function DayPlan({ updatedItinerary, onUpdate ,mainToggleButton}) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedDate, setEditedDate] = useState("");
 

  // Get the next N days based on the itinerary length and a starting date
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

  // Parse the initial dates
  const initialStartDate = new Date(); // Default to today's date
  const dayDates = getNextNDays(initialStartDate, updatedItinerary?.days?.length || 0);

  // Handle edit button click
  const handleEditClick = (index, currentDate) => {
    setEditingIndex(index);
    setEditedDate(currentDate); // Set the current date in the editable input
  };

  // Handle save
  const handleSave = (index) => {
    const updatedDays = [...updatedItinerary.days];

    // Parse the edited date
    const newStartDate = new Date(editedDate);
    if (isNaN(newStartDate.getTime())) {
      alert("Invalid date format. Please enter a valid date.");
      return;
    }

    // Recalculate all dates based on the new starting date
    const newDayDates = getNextNDays(newStartDate, updatedDays.length);

    // Update the dates for all days
    updatedDays.forEach((day, i) => {
      day.date = newDayDates[i];
    });

    onUpdate(updatedDays); // Pass the updated days to the parent component
    setEditingIndex(null); // Exit editing mode
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingIndex(null); // Exit editing mode without saving
  };

  return (
    <div className="text-gray-800 text-sm font-medium">
      <h2 className="text-lg font-semibold mb-0 pl-[16px]">Day Plan</h2>
      <div className="relative bg-white p-4 mt-2">
        <div className="absolute left-[18.5px] top-[19px] h-[72%] w-[2px] bg-gray-300"></div>
        <ul className="space-y-2">
          {updatedItinerary?.days?.map((day, index) => (
            <li key={index} className="relative flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              {editingIndex === index ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editedDate}
                    onChange={(e) => setEditedDate(e.target.value)}
                    placeholder="Enter date (e.g., 01 Jan, Mon)"
                    className="border border-gray-300 rounded-md p-1"
                  />
                  <button
                    onClick={() => handleSave(index)}
                    className="px-2 py-1 bg-blue-600 text-white rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-2 py-1 bg-gray-500 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-[11px]">{day.date || dayDates[index]}</span>
                  {
                    mainToggleButton &&  <button
                    onClick={() => handleEditClick(index, day.date || dayDates[index])}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit size={14} />
                  </button>
                  }
                 
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Tabs({ setActiveTab, activeTab,sharelink ,setShareLink}) {
  const [linkshareid, setLinkShareId] = useState("");

  return (
    <div className="border-b  border-gray-300 flex justify-between items-start  px-5">
      {/* Tabs */}
      <div className="flex space-x-8">
        {["itinerary", "policies", "summary"].map((tab) => (
          <button
            key={tab}
            className={`relative pb-2 text-lg font-semibold ${activeTab === tab ? "text-blue-600" : "text-gray-700"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
            {activeTab === tab && (
              <div className="absolute left-0 bottom-0 w-full h-1 bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* Share Button */}
      <button className="flex items-center text-gray-600 hover:text-blue-600" onClick={()=>{setLinkShareId(true)}}>
        <FaShare size={18} className="mr-1" />
        Share
      </button>
        {
          linkshareid  && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className=" font-semibold mb-4 text-[11px]">ShareLink:{sharelink}</p>
            <button
             
              className="bg-green-500 text-white py-2 px-4 rounded  transition-colors duration-300" onClick={()=>{
               
                setLinkShareId(false)
              }}
            >
              Close
            </button>
          </div>
        </div>
        }
     
    </div>
  );
}



const TourPackage = ({ updatedItinerary, onUpdate,mainToggleButton ,handleSubmit,setModaltosave,modaltosave}) => {
 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    groupPackage: updatedItinerary?.country,
    people: updatedItinerary.people,
    duration: updatedItinerary.duration,
    staynight: updatedItinerary.staynight,
  });
  const [staynightInput, setStaynightInput] = useState(
    updatedItinerary.staynight.map((item) => `${item?.city}N ${item?.nights}`).join(" • ")
  );

  console.log(staynightInput,887)
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    // console.log(name)
  };

  // Handle stay nights input change
  const handleStaynightChange = (e) => {
    setStaynightInput(e.target.value);
  };

  // Handle save
  const handleSave = () => {
    // Parse staynightInput into the correct format
  
    const parsedStaynight = staynightInput.split(" • ").map((item) => {
      const [nights, city] = item.split("N ");
      return [city, parseInt(nights)];
    });


 

    // Update formData with parsed staynight
    
   
    if(parseInt(formData.duration?.split("Days")[0]) <= updatedItinerary.days.length){
      const updatedData = {
        ...formData,
        staynight: parsedStaynight,
      };
      onUpdate(updatedData);
    
    }
    else{
      const updatedData = {
        ...formData,
        staynight: parsedStaynight,
        duration:updatedItinerary.days.length + "Days"
      };
      setFormData((prev) => ({
        ...prev,
        duration : updatedItinerary.days.length + " Days",
      }))
      onUpdate(updatedData);
    }

    
    // Pass updated data to the parent component
    setIsEditing(false); // Exit editing mode
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false); // Exit editing mode without saving
  };

  // Format stay nights data for display
  const formattedData = formData.staynight.map((item) => `${item?.nights}N ${item?.city}`).join(" • ");

  return (
    <div className="p-4 bg-white border rounded-lg flex items-center space-x-2 flex-wrap relative z-10">
      {isEditing ? (
        <>
          {/* Group Package Input */}
          <input
            type="text"
            name="groupPackage"
            value={formData.groupPackage}
            onChange={handleChange}
            className="border px-3 py-1 rounded"
          />
          {/* People Input */}
          <input
            type="number"
            name="people"
            value={formData.people}
            onChange={handleChange}
            className="border px-3 py-1 rounded"
          />
          {/* Duration Input */}
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border px-3 py-1 rounded"
          />
          {/* Stay Nights Input */}
          <input
            type="text"
            value={staynightInput}
            onChange={handleStaynightChange}
            placeholder="e.g., 2N Kyoto • 2N Tokyo"
            className="border px-3 py-1 rounded"
          />
          {/* Save and Cancel Buttons */}
          <button
            onClick={handleSave}
            className="px-4 py-1 bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-1 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          {/* Display Group Package */}
          <button className="border px-3 py-1 rounded flex items-center space-x-1">
            <span>⚒</span>
            <span>{formData.groupPackage}</span>
          </button>
          {/* Display People */}
          <button className="border px-3 py-1 rounded">{formData.people} People Group</button>
          {/* Display Duration */}
          <button className="border px-3 py-1 rounded">{formData.duration}</button>
          {/* Display Stay Nights */}
          <p className="text-gray-700 text-lg font-medium">
            <span className="font-semibold text-[12px]">{formattedData}</span>
          </p>
          {/* Edit Button */}
          {
            mainToggleButton &&   <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaEdit size={18} />
          </button>
          }
        
        </>
      )}

      <div className="absolute flex  items-center gap-1 right-5 bg-blue-600 text-white text-[12px] px-3 py-2 rounded-md hover:bg-blue-700" onClick={()=>{
        handleSubmit()}}>
         <FaRegSave/> Save
      </div>


      {
        modaltosave === "open" ?   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <p className="text-lg font-semibold mb-4">Your changes have been saved successfully!</p>
          <button
           
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300" onClick={()=>{setModaltosave(false)}}
          >
            Close
          </button>
        </div>
      </div> : modaltosave=="error" ? <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <p className="text-lg font-semibold mb-4">There someting Went wrong</p>
          <button
           
            className="bg-[red] text-white py-2 px-4 rounded  transition-colors duration-300" onClick={()=>{setModaltosave("false")}}
          >
            Close
          </button>
        </div>
      </div> :null
      }

    
    </div>
  );
};



// const SearchBar = () => {
//   return (
//     <div className="flex bg-[#0A1C33] p-3 items-center space-x-3">
//       <div className="bg-[#1D3557] px-4 py-2 rounded-md text-white w-[20%]">
//         <p className="text-xs text-blue-400">STARTING FROM</p>
//         <p className="text-lg">New Delhi</p>
//       </div>
//       <div className="bg-[#1D3557] px-4 py-2 rounded-md text-white w-[20%]">
//         <p className="text-xs text-blue-400">TRAVELLING ON</p>
//         <p className="text-lg">Sun, 3 Aug 2025</p>
//       </div>
//       <div className="bg-[#1D3557] px-4 py-2 rounded-md text-white w-[20%]">
//         <p className="text-xs text-blue-400">ROOMS & GUESTS</p>
//         <p className="text-lg">2 Adults</p>
//       </div>
//       <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold px-6 py-2 rounded-full">
//         SEARCH
//       </button>
//     </div>
//   );
// };



export  function FlightCard({setUpdatedItinerary}) {
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
        <span className="ml-auto text-blue-600 text-sm cursor-pointer">MODIFY</span>
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



const App2 = () => {
  const location = useLocation();
  const itineraryData = location.state;
  const [updatedItinerary, setUpdatedItinerary] = useState(itineraryData);
  const [mainToggleButton,setMainToggleButton] = useState(true)
  const [activeTab, setActiveTab] = useState("itinerary");
  const [modaltosave,setModaltosave] = useState()
  const [sharelink,setShareLink] = useState()
 console.log(updatedItinerary,"popopopop")
  useEffect(() => {
    const fetchImages = async () => {
      const access_id = "8pycO0DRNqhKOn4Z__LcZuBQyHUKQjqN_OoOJbC6tp8";

      try {
        // Fetch 10 images for the destination
        const destinationUrl = `https://api.unsplash.com/search/photos?page=1&query=${itineraryData.destination}&per_page=10&client_id=${access_id}`;
        const destinationResponse = await fetch(destinationUrl);
        const destinationData = await destinationResponse.json();
        const destinationImages = destinationData.results.slice(0, 10).map((img) => img.urls.small);

        // Fetch images for places in the itinerary
        const updatedDays = await Promise.all(
          itineraryData.days.map(async (day) => ({
            ...day,
            activities: await Promise.all(
              day.activities.map(async (activity) => ({
                ...activity,
                places: await Promise.all(
                  activity.places.map(async (place) => {
                    const placeUrl = `https://api.unsplash.com/search/photos?page=1&query=${place}&client_id=${access_id}`;
                    try {
                      const response = await fetch(placeUrl);
                      if (!response.ok) throw new Error(`Error: ${response.status}`);
                      const data = await response.json();
                      return { name: place, imageUrl: data.results[0]?.urls.small || "" };
                    } catch (error) {
                      console.error("Error fetching image:", error);
                      return { name: place, imageUrl: "" };
                    }
                  })
                ),
              }))
            ),
          }))
        );

        setUpdatedItinerary({ ...itineraryData, destinationImage: destinationImages, days: updatedDays });
        // handleSubmit()
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [itineraryData]);


  const handleThemeEdit = (dayIndex, newTheme) => {
    const updatedDays = [...updatedItinerary.days];
    updatedDays[dayIndex].theme = newTheme;
    setUpdatedItinerary({ ...updatedItinerary, days: updatedDays });
  };

  const handleImageUpdate = (updatedImages) => {

    setUpdatedItinerary((prev) => ({
      ...prev,
      destinationImage: updatedImages,
    }));
  };

  const handleTourPackageUpdate = (updatedData) => {
    const updatedDays = [...updatedItinerary.days];

     let value = parseInt(updatedData.duration.split("Days")[0].trim(), 10);
   
   if(value <= updatedDays.length){
    // Select the first `value - 1` items to leave space for the last day
    let daysSelected = updatedDays.slice(0, value - 1);
    
    // Ensure the last item is included (without duplication)
   
    if (updatedDays.length > value) {
      daysSelected.push(updatedDays[updatedDays.length - 1]);
    }
    

    setUpdatedItinerary((prev) => ({
      ...prev,
      people: updatedData.people,
      duration: updatedData.duration,
      staynight: updatedData.staynight,
      days: daysSelected,
    }));
   }


   else{
    
    setUpdatedItinerary((prev) => ({
      ...prev,
      people: updatedData.people,
      duration: updatedDays.length,
      staynight: updatedData.staynight,
    }));
   }
    // Assuming updatedData.duration is in the format like "3 Days" 
  };

  const handleDayPlanUpdate = (updatedDays) => {
    setUpdatedItinerary((prev) => ({
      ...prev,
      days: updatedDays,
    }));
  };


  const handleUpdate = (updatedData) => {
   
    setUpdatedItinerary(updatedData);
  };

  const handleUpdatePolice = (updatedData) => {
  
    setUpdatedItinerary(updatedData);
  };

  const handleSubmit = async (e) => {
    
    
    try {
      const response = await fetch('https://itinerary-backend-khaki.vercel.app/create-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItinerary),
      });

      if (!response.ok) {
        throw new Error('Error creating itinerary');
      }

      const data = await response.json();
      setModaltosave("open")
      setShareLink(data?.shareableLink)
      // setShareableLink(data?.shareableLink)
      // fetchItinerary(data?.shareableLink)
      // You can redirect or show a success message here
    } catch (error) {
      setModaltosave("error")
      console.error('Error:', error);
    }
  };



  // const fetchItinerary = async (shareableLink) => {
  //   // console.log(shareableLink,"kh")
  //   try {
  //     const response = await fetch(`http://192.168.0.109:5000/itinerary/${shareableLink}`);

  //     if (!response.ok) {
  //       throw new Error('Itinerary not found');
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     console.log(false);
  //   }
  // };


  return (
    <>
      <div className="bg-gray-200 min-h-screen ">
        {/* <SearchBar /> */}
        <TourPackage updatedItinerary={updatedItinerary} onUpdate={handleTourPackageUpdate}  mainToggleButton={mainToggleButton} handleSubmit={handleSubmit} setModaltosave={setModaltosave} modaltosave={modaltosave}/>
        <div className="bg-white">
          <Banner updatedItinerary={updatedItinerary} onImageUpdate={handleImageUpdate} mainToggleButton={mainToggleButton}/>
          <Tabs setActiveTab={setActiveTab} activeTab={activeTab} sharelink={sharelink} setShareLink={setShareLink}/>
        </div>
        <div className="flex mt-5 p-4 pt-0 pr-0   nnn  bg-white  shadow-md rounded-md mx-5">
          <div className="w-[12%] border-r-[1px] pt-4">
            <DayPlan updatedItinerary={updatedItinerary} onUpdate={handleDayPlanUpdate} mainToggleButton={mainToggleButton}/>
          </div>
          <div className="w-[88%]">
            {
              activeTab == "itinerary" ? <Itinerary updatedItinerary={updatedItinerary} setUpdatedItinerary={setUpdatedItinerary} setActiveTab={setActiveTab} onThemeEdit={handleThemeEdit} mainToggleButton={mainToggleButton} /> : activeTab == "summary" ? <TableSummary updatedItinerary={updatedItinerary} onUpdate={handleUpdate}  mainToggleButton={mainToggleButton}/> : activeTab == "policies" ? <Policies updatedItinerary={updatedItinerary} onUpdate={handleUpdatePolice}  mainToggleButton={mainToggleButton}/> : activeTab == "hotels" ? <DayCard   updatedItinerary={updatedItinerary}  setUpdatedItinerary={setUpdatedItinerary} mainToggleButton={mainToggleButton}/> : <FlightCard setUpdatedItinerary={setUpdatedItinerary} mainToggleButton={mainToggleButton}/>
            }
          </div>
        </div>
      </div>

      
      
    </>
  )

};

export default App2;






