import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "../Buttons/BaseButton";
import styles from "../../Styles/VenueForm.module.scss";

const defaultVenueData = {
  id: "",
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
    zip: "",
    country: "",
    continent: "",
    lat: 0,
    lng: 0,
  },
};

export const VenueForm = ({ venueData, onSave, onClose, editVenue }) => {
  const [venue, setVenue] = useState(venueData || defaultVenueData);

  const formSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const updatedVenue = {
      ...venue,
      price: parseFloat(venue.price),
      maxGuests: parseInt(venue.maxGuests),
    };
    onSave(updatedVenue);
  };

  const formCancel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };

  const handleMediaChange = (e) => {
    const { value } = e.target;
    const updatedMedia = [...venue.media, value];

    const image = new Image();
    image.src = value;
    image.onload = () => {
      const updatedPreviews = Array.isArray(venue.mediaPreviews)
        ? [...venue.mediaPreviews, image.src]
        : [image.src];
      setVenue({
        ...venue,
        media: updatedMedia,
        mediaPreviews: updatedPreviews,
      });
    };
  };

  const handleRemoveMedia = (index) => {
    const updatedMedia = [...venue.media];
    updatedMedia.splice(index, 1);
    setVenue({
      ...venue,
      media: updatedMedia,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenue({
      ...venue,
      [name]: value,
    });
  };

  const handleLocationInputChange = (e) => {
    const { name, value } = e.target;
    setVenue((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setVenue({
      ...venue,
      meta: {
        ...venue.meta,
        [name]: checked,
      },
    });
  };

  useEffect(() => {
    if (editVenue) {
      const confirmUpdate = window.confirm("Are you happy with your changes?");
      if (confirmUpdate) {
      } else {
      }
    }
  }, [editVenue]);

  return (
    <form>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6">
          <div className={styles.formGroup}>
            <label htmlFor="name" className={`${styles.label} text-start`}>
              Title:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={venue.name}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label
              htmlFor="description"
              className={`${styles.label} text-start`}
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={venue.description}
              onChange={handleInputChange}
              required
              className={styles.textarea}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price" className={`${styles.label} text-start`}>
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={venue.price}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="maxGuests" className={`${styles.label} text-start`}>
              Max Guests:
            </label>
            <input
              type="number"
              id="maxGuests"
              name="maxGuests"
              value={venue.maxGuests}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="media" className={`${styles.label} text-start`}>
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
            <label className={`${styles.label} text-start`}>Media Items:</label>
            {venue.media.map((mediaItem, index) => (
              <div key={index} className={styles.mediaItemContainer}>
                {mediaItem && (
                  <img
                    src={mediaItem}
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
          <div className={styles.formGroup}>
            <label
              htmlFor="locationAddress"
              className={`${styles.label} text-start`}
            >
              Address:
            </label>
            <input
              type="text"
              id="locationAddress"
              name="address"
              value={venue.location.address}
              onChange={handleLocationInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label
              htmlFor="locationCity"
              className={`${styles.label} text-start`}
            >
              City:
            </label>
            <input
              type="text"
              id="locationCity"
              name="city"
              value={venue.location.city}
              onChange={handleLocationInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label
              htmlFor="locationCountry"
              className={`${styles.label} text-start`}
            >
              Country:
            </label>
            <input
              type="text"
              id="locationCountry"
              name="country"
              value={venue.location.country}
              onChange={handleLocationInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={`${styles.label} text-start`}>Amenities:</label>
            <div className={styles.formCheck}>
              <input
                type="checkbox"
                className={styles.formCheckInput}
                name="wifi"
                checked={venue.meta.wifi}
                onChange={handleCheckboxChange}
              />
              <label className={styles.formCheckLabel}>Wi-Fi</label>
            </div>
            <div className={styles.formCheck}>
              <input
                type="checkbox"
                className={styles.formCheckInput}
                name="parking"
                checked={venue.meta.parking}
                onChange={handleCheckboxChange}
              />
              <label className={styles.formCheckLabel}>Parking</label>
            </div>
            <div className={styles.formCheck}>
              <input
                type="checkbox"
                className={styles.formCheckInput}
                name="breakfast"
                checked={venue.meta.breakfast}
                onChange={handleCheckboxChange}
              />
              <label className={styles.formCheckLabel}>Breakfast</label>
            </div>
            <div className={styles.formCheck}>
              <input
                type="checkbox"
                className={styles.formCheckInput}
                name="pets"
                checked={venue.meta.pets}
                onChange={handleCheckboxChange}
              />
              <label className={styles.formCheckLabel}>Pets Allowed</label>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-center">
        <BaseButton
          type="submit"
          onClick={formSubmit}
          className={styles.submitButton}
        >
          Save
        </BaseButton>
        <BaseButton
          type="submit"
          onClick={formCancel}
          className={styles.submitButton}
        >
          Cancel
        </BaseButton>
      </div>
    </form>
  );
};
