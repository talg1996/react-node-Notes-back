import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { CiLogin } from "react-icons/ci";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        Email: Email,
        Password: Password,
      });

      console.log(response.data); // Log the response from the server
      // Handle success or navigate to another page upon successful login
    } catch (error) {
      console.error("Error logging in:", error);
      console.log(`Login failed`);
      // Handle error (e.g., display an error message to the user)
    }
  };

  return (
    <div className="login-container">
      <div className="wellcom-container">
        <h1>Wellcome to Note app</h1>
        <h2>Never forget anything</h2>
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={Email}
              onChange={handleEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={Password}
              onChange={handlePassword}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
            <span className="Logo">
              <CiLogin />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
