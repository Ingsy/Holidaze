import React, { useState } from "react";
import { setToken } from "../utils/LocalStorage";
import { headers } from "../utils/authFetch";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    venueManager: false,
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const isStudNoroffEmail = /@stud\.noroff\.no$/i.test(value);
    if (name === "email" && !isStudNoroffEmail) {
      setError("Please use a valid @stud.noroff.no email address");
    } else {
      setError(""); // Clear the error if the email is valid
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form successfully registered:", formData);

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/register",
        {
          method: "POST",
          headers: {
            ...headers(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Response Data:", data);
      const token = data.token;

      const userName = data.name;

      // redirect the user to the login..
      setToken(token);

      console.log("Token:", token);
      console.log("User Name:", userName);
    } catch (error) {
      console.error("Registration error:", error);
      console.log("Error caught:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="avatar">Avatar (Optional):</label>
        <input
          type="url"
          id="avatar"
          name="avatar"
          value={formData.avatar}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="venueManager">Venue Manager (Optional):</label>
        <input
          type="checkbox"
          id="venueManager"
          name="venueManager"
          checked={formData.venueManager}
          onChange={(e) =>
            setFormData({ ...formData, venueManager: e.target.checked })
          }
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
