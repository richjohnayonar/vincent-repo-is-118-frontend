import React from "react";
import { useParams } from "react-router-dom";

function Subject() {
  const { userId } = useParams();

  // Now 'userId' contains the ID extracted from the URL, i.e., /subject/:userId

  // Use 'userId' to fetch or display user-specific data

  return (
    <div>
      <h1>Subject Page for User ID: {userId}</h1>
      {/* Render subject data or other content */}
    </div>
  );
}

export default Subject;
