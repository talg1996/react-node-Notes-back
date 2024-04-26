import React, { useEffect, useState } from "react";
import Login from "./components/Login.jsx";

function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api");
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setBackendData(data.users || []); // Set to empty array if data.users is undefined
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Log user emails to console
  useEffect(() => {
    backendData.forEach((user) => {
      console.log("User Email:", user);
    });
  }, [backendData]); // Run this effect whenever backendData changes

  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
