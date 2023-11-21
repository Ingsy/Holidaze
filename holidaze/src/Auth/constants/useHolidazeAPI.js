import axios from "axios";
import { getUserName } from "../utils/LocalStorage";
import { headers } from "../../Auth/utils/authFetch";

export const API_HOST_URL = "https://api.noroff.dev";
export const API_BASE_URL = "/api/v1";
export const API_HOLIDAZE_BASE = "/holidaze";
export const API_HOLIDAZE_URL = `${API_HOST_URL}${API_BASE_URL}${API_HOLIDAZE_BASE}`;

const userName = getUserName();

export const VenueBaseUrl = `${API_HOLIDAZE_URL}/venues`;
export const VenueDetailUrl = `https://api.noroff.dev/api/v1/holidaze/venues/`;

export const Register = `${API_HOLIDAZE_URL}/auth/register`;
export const Login = `${API_HOLIDAZE_URL}/auth/login`;


export const ProfileBaseUrl = `${API_HOLIDAZE_URL}/profiles`;
export const UserProfile = `${ProfileBaseUrl}/${userName}`;

export const ProfileVenuesUrl = `${UserProfile}/venues/?_venues=true`;
export const ProfileBookingsUrl = `${UserProfile}/bookings/?_bookings=true&_venue=true`;
export const ProfileBookingsUrlTest = `${UserProfile}/venues/?_bookings=true`;

export const UpdateProfileMedia = `${UserProfile}/media`;

export const BookingBaseUrl = `${API_HOLIDAZE_URL}/bookings`;
//export const BookingCustomerUrl = `${BookingBaseUrl}?_customer=true`; (NOT IN USE YET)
export const BookingVenueUrl = `${BookingBaseUrl}/?_venue=true`;
//export const BookingSingle = `${BookingBaseUrl}/id`; (Get a single booking )

export const BookingsByProfile = `${BookingBaseUrl}/${userName}/bookings`;
export const AllBookingsByProfile = `${UserProfile}/bookings/?_venue=true`;
export const AllBookingsByProfileVenue = `${UserProfile}/bookings/?_venue=true`;

export const BookingsForVenueUrl = `${BookingBaseUrl}?_bookings=true&_customer=true`;






const getConfig = () => {
    return {
        headers: headers()
    }
}

export const useHolidaizApi = () => {

    return {
        bookings: {
            get: () => axios.get(`${AllBookingsByProfile}`, getConfig()).then(response => response.data),
            getSingle: (bookingId) => axios.get(`${BookingBaseUrl}/${bookingId}/?_venue=true`, getConfig()).then(response => response.data),
            create: (data) => axios.post(`${BookingBaseUrl}`, data, getConfig()).then(response => response.data),
            update: (bookingId, updatedData) => axios.put(`${BookingBaseUrl}/${bookingId}`, updatedData, getConfig()).then(response => response.data),
            delete: (bookingId) => axios.delete(`${BookingBaseUrl}/${bookingId}`, getConfig()).then(response => response.data)
        },
        // TODO: Replace with actual URL and params/data
        profile: {
            create: (data) => axios.post(`${BookingBaseUrl}`, data, getConfig()).then(response => response.data),
            update: (venueId, bookingId, updatedData) => axios.put(`${BookingBaseUrl}${venueId}/${bookingId}`, updatedData, getConfig()).then(response => response.data),
            delete: (venueId, bookingId) => axios.post(`${BookingBaseUrl}${venueId}/${bookingId}`, getConfig()).then(response => response.data)
        },

        venues: {
            get: () => axios.get(`${VenueBaseUrl}`, getConfig()).then(response => response.data),
            create: (data) => axios.post(`${VenueDetailUrl}`, data, getConfig()),
            update: (venueId, updatedData) => axios.put(`${VenueDetailUrl}${venueId}`, updatedData, getConfig()).then(response => response.data),
            delete: (venueId) => axios.delete(`${VenueDetailUrl}${venueId}`, getConfig()).then(response => response.data),
            //getAll: (query) => axios.get(baseVenueUrl, { params: { query } }).then(response => response.data)
        }
    }
}

//const deleteVenueBiggerFunction = (venueId, bookingId) => {
//    const dosome = {};
    // Show confirm dialogue
//    return axios.post(`${BookingBaseUrl}${venueId}/${bookingId}`, getConfig()).then(response => response.data)
//}


/*
3 forskjellige måter å skrive samme funksjonen på

const createBooking = (data) => axios.post(`${BookingBaseUrl}`, data, getConfig());
const createBooking2 = (data) => {
    return axios.post(`${BookingBaseUrl}`, data, getConfig());
}
function createBooking3(data) {
    return axios.post(`${BookingBaseUrl}`, data, getConfig());
}
*/
