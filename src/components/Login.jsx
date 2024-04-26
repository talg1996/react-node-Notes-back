import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { CiLogin } from "react-icons/ci";
import { GiArchiveRegister } from "react-icons/gi";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  function checkInput() {
    if (Email === "" || Password === "") {
      return false;
    } else {
      return true;
    }
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlerRegister = async (e) => {
    e.preventDefault();

    if (checkInput()) {
      try {
        const response = await axios.post("http://localhost:4000/register", {
          Email: Email,
          Password: Password,
        });

        console.log("Registration response:", response);

        // Check the response status and display appropriate alert
        if (response.status === 201) {
          alert("User registered successfully!");
        } else {
          alert("Unexpected response. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("User with this email already exists. ");
        } else {
          console.error("Error registering user:", error.message);
          alert("Registration failed. Please try again.");
        }
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkInput() === false) {
      alert("Please fill in all fields");
    } else {
      console.log(e);
      try {
        const response = await axios.post("http://localhost:4000/login", {
          Email: Email,
          Password: Password,
        });
        alert("Login successful");
        // Handle success or navigate to another page upon successful login
      } catch (error) {
        if (error.response.status === 401) {
          alert("Not register");
        }
        console.error("Error logging in:", error);
        console.log(`Login failed`);
        // Handle error (e.g., display an error message to the user)
      }
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
        <button
          type="button"
          className="register-btn"
          onClick={handlerRegister}
        >
          Register
          <span className="Logo">
            <GiArchiveRegister />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Login;
