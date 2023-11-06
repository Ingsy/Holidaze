import axios from "axios";
import { headers } from "../../Auth/utils/authFetch";

const VenueDetailUrl = `https://api.noroff.dev/api/v1/holidaze/venues/`;

export function updateVenue(venueId, updatedData) {
  const config = {
    headers: headers(),
  };

  console.log("Update Venue Headers:", config.headers); // Log headers

  return axios.put(`${VenueDetailUrl}${venueId}`, updatedData, config);
}

export function createVenue(data) {
  const config = {
    headers: headers(),
  };

  console.log("Update Venue Headers:", config.headers); // Log headers

  return axios.post(`${VenueDetailUrl}`, data, config);
}

export function deleteVenue(venueId) {
  const config = {
    headers: headers(),
  };

  console.log("Delete Venue Headers:", config.headers); // Log headers

  return axios.delete(`${VenueDetailUrl}${venueId}`, config);
}
