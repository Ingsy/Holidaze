import { headers } from "../../../Auth/utils/authFetch";

export async function UpdateVenueManager(userName, isVenueManager) {
  const managerUrl = `https://api.noroff.dev/api/v1/holidaze/profiles/${userName}`;

  const updatedValue = !isVenueManager;

  const requestOptions = {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      venueManager: updatedValue,
    }),
  };

  try {
    const response = await fetch(managerUrl, requestOptions);
    if (!response.ok) {
      throw new Error("Toggle updatet failed");
    }
    return updatedValue;
  } catch (error) {
    console.error("Error toggling Manager/normal-user:", error);
    throw error;
  }
}
