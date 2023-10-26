import React from "react";
import UserProfile from "./UserProfile/UserProfile";
import UpdateForm from "./Avatar/UpdateForm";
import ToggleVenueManager from "./ToggleVenueManager/Toggle";
import CreateVenue from "../../Components/CreateVenue";
import ProfileVenues from "./ProfileVenues";
import { useState } from "react";
import Modal from "../../Components/Modal";

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <UserProfile />
      <button onClick={openModal}>Open Update Form</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UpdateForm />
      </Modal>
      <ToggleVenueManager />
      <CreateVenue />
      <ProfileVenues />
    </div>
  );
}

export default Profile;
