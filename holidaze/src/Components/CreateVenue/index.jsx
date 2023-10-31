import React, { useState } from "react";
import { CreateVenueUrl } from "../../Auth/constants";
import { headers } from "../../Auth/utils/authFetch";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./Create.module.scss";
import Alert from "../Alert";
import VenueDetails from "../VenueDetails";

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
      address: "",
      city: "",
      zip: "Unknown",
      country: "",
      continent: "Unknown",
      lat: 0,
      lng: 0,
    },
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({ message: "", type: "" });
  const [createdVenueId, setCreatedVenueId] = useState(null);
  const navigate = useNavigate();

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

  const handleLocationInputChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
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
      setAlertContent({
        message: "Invalid data: Price and Max guests must be numbers.",
        type: "error",
      });
      setShowAlert(true);
      return;
    }

    try {
      const response = await fetch(CreateVenueUrl, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(convertedVenueData),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        console.log("Error response:", responseBody);
        setAlertContent({ message: "Create venue failed", type: "error" });
        setShowAlert(true);
        throw new Error("Create venue failed");
      } else {
        const responseJson = await response.json();
        const { id } = responseJson;
        setCreatedVenueId(id);

        navigate(`/venue/${id}`);

        setAlertContent({
          message: "Venue created successfully!",
          type: "success",
        });
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Create venue error:", error);
      setAlertContent({ message: "An error occurred", type: "error" });
      setShowAlert(true);
    }
  };

  return (
    <div className={styles.formContainer}>
      {showAlert && (
        <Alert message={alertContent.message} type={alertContent.type} />
      )}
      <h2 className={styles.formTitle}>Rent out your Home</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
            {/* Left side for md and lg devices */}
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Title:
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
                Add photos (Image URLs):
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
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={styles.TrashIcon}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            {/* Right side for md and lg devices */}
            <div className={styles.formGroup}>
              <label htmlFor="locationAddress" className={styles.label}>
                Address:
              </label>
              <input
                type="text"
                id="locationAddress"
                name="address"
                value={venueData.location.address}
                onChange={handleLocationInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="locationCity" className={styles.label}>
                City:
              </label>
              <input
                type="text"
                id="locationCity"
                name="city"
                value={venueData.location.city}
                onChange={handleLocationInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="locationCountry" className={styles.label}>
                Country:
              </label>
              <input
                type="text"
                id="locationCountry"
                name="country"
                value={venueData.location.country}
                onChange={handleLocationInputChange}
                className={styles.input}
              />
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
          </div>
        </div>
        <hr />
        <div className="text-center">
          <button type="submit" className={styles.submitButton}>
            Create Venue
          </button>
          {/* Conditionally render the link to checkout the new venue */}
          {createdVenueId && (
            <Link
              to={`/venues/${createdVenueId}`}
              className={styles.checkoutLink}
            >
              Checkout Your New Venue
            </Link>
          )}
        </div>
      </form>
      {createdVenueId && <VenueDetails venueId={createdVenueId} />}
    </div>
  );
}

export default CreateVenue;
