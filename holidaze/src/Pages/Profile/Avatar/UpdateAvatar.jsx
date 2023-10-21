import { headers } from "../../../Auth/utils/authFetch";

export function UpdateAvatar(userName, avatarUrl) {
  const AvatarUrl = `https://api.noroff.dev/api/v1/holidaze/profiles/${userName}/media`;

  const requestOptions = {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  };

  fetch(AvatarUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Avatar update failed");
      }
      // Handle success
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
      // Handle error
    });
}
