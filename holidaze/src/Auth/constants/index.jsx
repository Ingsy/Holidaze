export const API_HOST_URL = "https://api.noroff.dev";
export const API_BASE_URL = "/api/v1";
export const API_HOLIDAZE_BASE = "/holidaze";
export const API_HOLIDAZE_URL = `${API_HOST_URL}${API_BASE_URL}${API_HOLIDAZE_BASE}`;

export const ProfileBaseUrl = `${API_HOLIDAZE_URL}/profiles`;
export const UserProfile = `${ProfileBaseUrl}/<name>`;
export const ProfileVenuesUrl = `${ProfileBaseUrl}?_venues=true`;
export const ProfileBookingsUrl = `${ProfileBaseUrl}?_bookings=true`;
export const UpdateProfileMedia = `${UserProfile}/media`;

export const BookingBaseUrl = `${API_HOLIDAZE_URL}/bookings`;
export const BookingCustomerUrl = `${BookingBaseUrl}?_customer=true`;
export const BookingVenueUrl = `${BookingBaseUrl}?_venue=true`;
