import axios from "axios";
import { headers } from "../../Auth/utils/authFetch";

const BookingUrl = `https://api.noroff.dev/api/v1/holidaze/bookings/`;

export async function updateBooking(venueId, updatedData) {
  const config = {
    headers: headers(),
  };

  try {
    const response = await axios.put(
      `${BookingUrl}${venueId}`,
      updatedData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

export async function createBooking(data) {
  const config = {
    headers: headers(),
  };

  try {
    const response = await axios.post(BookingUrl, data, config);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export async function deleteBooking(venueId) {
  const config = {
    headers: headers(),
  };

  try {
    const response = await axios.delete(`${BookingUrl}${venueId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}
