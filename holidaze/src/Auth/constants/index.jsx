import { getUserName } from "../utils/LocalStorage";

export const API_HOST_URL = "https://api.noroff.dev";
export const API_BASE_URL = "/api/v1";
export const API_HOLIDAZE_BASE = "/holidaze";
export const API_HOLIDAZE_URL = `${API_HOST_URL}${API_BASE_URL}${API_HOLIDAZE_BASE}`;

const userName = getUserName();

export const ProfileBaseUrl = `${API_HOLIDAZE_URL}/profiles`;
export const UserProfile = `${ProfileBaseUrl}/${userName}`;
export const ProfileVenuesUrl = `${UserProfile}/venues/?_venues=true`;
export const ProfileBookingsUrl = `${UserProfile}/bookings/?_bookings=true`;
export const UpdateProfileMedia = `${UserProfile}/media`;

export const BookingBaseUrl = `${API_HOLIDAZE_URL}/bookings`;
export const BookingCustomerUrl = `${BookingBaseUrl}?_customer=true`;
export const BookingVenueUrl = `${BookingBaseUrl}?_venues=true`;

export const CreateVenueUrl = `${API_HOLIDAZE_URL}/venues`;

export * from "./useHolidazeAPI";
