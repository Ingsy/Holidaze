import React, { useState } from "react";
import { getToken, setToken } from "../utils/LocalStorage";
import BaseButton from "../../Components/Buttons";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../Styles/VenueForm.module.scss";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const accessToken = data.accessToken;
      const userName = data.name;

      setToken(accessToken, userName);

      const existingToken = getToken();
      if (existingToken) {
        navigate("/profile");
        window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {loginError && <div className={styles.error}>{loginError}</div>}
      <div className="mt-4">
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
      </div>
      <div className="mt-3 mb-3">
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
      </div>
      <BaseButton type="submit">Login</BaseButton>
      <div>
        <Link to="/Register" className={styles.Link}>
          Register account
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
