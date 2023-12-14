import React, { useState, useEffect } from "react";
import axios from "axios";

function Home({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/student/${userId}`
        );
        setUserData(response.data); // Save the fetched data to state
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userId]);

  // Once data is fetched and stored in 'userData', display it in your component
  return (
    <div>
      <h1>Welcome to your Home Page {userData && userData.studentName}!</h1>
      <p>User ID: {userId}</p>
      {/* Render user-specific data or other content */}
    </div>
  );
}

export default Home;
