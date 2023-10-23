import React, { useState } from "react";
import { CreateVenueUrl } from "../../Auth/constants";
import { headers } from "../../Auth/utils/authFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./Create.module.css";

function CreateVenue() {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [],
    mediaPreviews: [],
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
    const updatedMedia = [...venueData.media, value];

    const image = new Image();
    image.src = value;
    image.onload = () => {
      const updatedPreviews = [...venueData.mediaPreviews, image.src];
      setVenueData({
        ...venueData,
        media: updatedMedia,
        mediaPreviews: updatedPreviews,
      });
    };
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
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create Venue</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={venueData.name}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={venueData.description}
            onChange={handleInputChange}
            required
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={venueData.price}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="maxGuests" className={styles.label}>
            Max Guests:
          </label>
          <input
            type="number"
            id="maxGuests"
            name="maxGuests"
            value={venueData.maxGuests}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="media" className={styles.label}>
            Media (Image URLs):
          </label>
          <input
            type="text"
            id="media"
            name="media"
            value={""}
            onChange={handleMediaChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Media Items:</label>
          {venueData.media.map((mediaItem, index) => (
            <div key={index} className={styles.mediaItemContainer}>
              {venueData.mediaPreviews[index] && (
                <img
                  src={venueData.mediaPreviews[index]}
                  alt="Media Preview"
                  className={styles.mediaPreview}
                />
              )}
              <span className={styles.mediaItem}>{mediaItem}</span>
              <button
                type="button"
                onClick={() => handleRemoveMedia(index)}
                className={styles.CheckoutActionButton}
              >
                <FontAwesomeIcon icon={faTrash} className={styles.TrashIcon} />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Optional Metadata:</label>
          <div className={styles.formCheck}>
            <input
              type="checkbox"
              className={styles.formCheckInput}
              name="wifi"
              checked={venueData.meta.wifi}
              onChange={handleCheckboxChange}
            />
            <label className={styles.formCheckLabel}>Wi-Fi</label>
          </div>
          <div className={styles.formCheck}>
            <input
              type="checkbox"
              className={styles.formCheckInput}
              name="parking"
              checked={venueData.meta.parking}
              onChange={handleCheckboxChange}
            />
            <label className={styles.formCheckLabel}>Parking</label>
          </div>
          <div className={styles.formCheck}>
            <input
              type="checkbox"
              className={styles.formCheckInput}
              name="breakfast"
              checked={venueData.meta.breakfast}
              onChange={handleCheckboxChange}
            />
            <label className={styles.formCheckLabel}>Breakfast</label>
          </div>
          <div className={styles.formCheck}>
            <input
              type="checkbox"
              className={styles.formCheckInput}
              name="pets"
              checked={venueData.meta.pets}
              onChange={handleCheckboxChange}
            />
            <label className={styles.formCheckLabel}>Pets Allowed</label>
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Create Venue
        </button>
      </form>
    </div>
  );
}

export default CreateVenue;
