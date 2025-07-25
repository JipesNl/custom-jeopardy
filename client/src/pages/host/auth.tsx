/**
 * Utility functions for handling authentication in the host application.
 */

import axios from "axios";

/**
 * Checks if the user is currently logged in by verifying the presence of a token in local storage.
 *
 * @returns {boolean} `true` if the user is logged in, `false` otherwise.
 */
const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return token !== null && token !== "";
};

/**
 * Logs in the user by sending the provided password to the backend for verification.
 *
 * @param {string} password - The password to authenticate the user.
 * @returns {Promise<number>} A promise that resolves to:
 * - `0` if the login is successful.
 * - The HTTP status code if the login fails (e.g., `401` for invalid credentials).
 * - `-1` if an unexpected error occurs.
 */
const logIn = async (password: string) => {
  console.log(password); // Ensure the password is logged for debugging
  try {
    const response = await axios.post("/api/login", {
      password,
    }); // Send password in the body
    if (response.status !== 200) return response.status; // Check for non-200 status
    localStorage.setItem("token", response.data.token); // Correctly reference response.data
    return 0; // Indicate success
  } catch (err) {
    if (err.response) {
      console.log("Login failed:", err.response.data);
      return err.response.status; // Return the status code from the server
    }
    console.error("Error during login:", err);
    return -1; // Indicate failure
  }
};

/**
 * Logs out the user by removing the token from local storage and reloading the page.
 */
const logOut = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

export { isLoggedIn, logIn, logOut };
