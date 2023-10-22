import React, { useState } from "react";
import { CreateVenueUrl } from "../../Auth/constants";
import { headers } from "../../Auth/utils/authFetch";

function CreateVenue() {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "Unknown",
      city: "Unknown",
      zip: "Unknown",
      country: "Unknown",
      continent: "Unknown",
      lat: 0,
      lng: 0,
    },
  });

  const handleMediaChange = (e) => {
    const { value } = e.target;
    setVenueData({
      ...venueData,
      media: [...venueData.media, value],
    });
  };

  const handleRemoveMedia = (index) => {
    const updatedMedia = [...venueData.media];
    updatedMedia.splice(index, 1);
    setVenueData({
      ...venueData,
      media: updatedMedia,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenueData({
      ...venueData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setVenueData({
      ...venueData,
      meta: {
        ...venueData.meta,
        [name]: checked,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit function started");

    const convertedVenueData = {
      ...venueData,
      price: parseFloat(venueData.price),
      maxGuests: parseInt(venueData.maxGuests),
    };

    if (
      isNaN(convertedVenueData.price) ||
      isNaN(convertedVenueData.maxGuests)
    ) {
      console.error("Invalid data: Price and Max guests must be numbers.");

      return;
    }

    try {
      const response = await fetch(CreateVenueUrl, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(convertedVenueData),
      });
      console.log("Request to CreateVenueUrl sent");

      if (!response.ok) {
        const responseBody = await response.json();
        console.log("Error response:", responseBody);
        throw new Error("Create venue failed");
      }
      // handle success
      console.log("Venue created successfully!");
    } catch (error) {
      console.error("Create venue error:", error);
    }
  };

  return (
    <div>
      <h2>Create Venue</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={venueData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={venueData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={venueData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxGuests">Max Guests:</label>
          <input
            type="number"
            id="maxGuests"
            name="maxGuests"
            value={venueData.maxGuests}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Add the media input field */}
        <div className="form-group">
          <label htmlFor="media">Media (Image URLs):</label>
          <input
            type="text"
            id="media"
            name="media"
            value={""} // Add a value to handle user input
            onChange={handleMediaChange}
          />
        </div>

        {/* Display the added media items */}
        <div className="form-group">
          <label>Media Items:</label>
          {venueData.media.map((mediaItem, index) => (
            <div key={index}>
              <span>{mediaItem}</span>
              <button type="button" onClick={() => handleRemoveMedia(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Optional Metadata:</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="wifi"
              checked={venueData.meta.wifi}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label">Wi-Fi</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="parking"
              checked={venueData.meta.parking}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label">Parking</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="breakfast"
              checked={venueData.meta.breakfast}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label">Breakfast</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="pets"
              checked={venueData.meta.pets}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label">Pets Allowed</label>
          </div>
        </div>

        <button type="submit">Create Venue</button>
      </form>
    </div>
  );
}

export default CreateVenue;
