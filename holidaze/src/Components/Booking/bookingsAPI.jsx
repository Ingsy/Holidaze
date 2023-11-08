import axios from "axios";
import { headers } from "../../Auth/utils/authFetch";

const BookingUrl = `https://api.noroff.dev/api/v1/holidaze/bookings/`;

export async function updateBooking(venueId, bookingId, updatedData) {
  const config = {
    headers: headers(),
  };

  try {
    const response = await axios.put(
      `${BookingUrl}${venueId}/${bookingId}`,
      updatedData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

export async function createBooking(venueId, data) {
  const config = {
    headers: headers(),
  };
  data.venueId = data.venue.id;
  try {
    const response = await axios.post(`${BookingUrl}${venueId}`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export async function deleteBooking(venueId, bookingId) {
  const config = {
    headers: headers(),
  };

  try {
    const response = await axios.delete(
      `${BookingUrl}${venueId}/${bookingId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}
