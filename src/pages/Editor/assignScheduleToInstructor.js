import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

function AssignInstructorSchedule() {
  // State to manage form fields
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("http://localhost:8000/api/schedule", {
        time: time,
        day: day,
        subject: subject,
      });
      setIsLoading(false);
      window.location.reload(); // Reload the page after successful deletion
    } catch (error) {
      console.log(error);
      setError("Error please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="form-container">
          <h2>Assign Instructor Schedule</h2>
          <form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="form-group">
              <label htmlFor="email">Time</label>
              <input
                type="text"
                id="time"
                name="time"
                placeholder="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Day</label>
              <input
                type="text"
                id="day"
                name="day"
                placeholder="Day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Subject Code</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject Code"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            {!isloading && (
              <button className="create-account-sb-button" type="submit">
                Confirm
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AssignInstructorSchedule;
