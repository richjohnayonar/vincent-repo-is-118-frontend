import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

function EnrollStudent({ userId }) {
  // State to manage form fields
  const [student, setStudent] = useState("");
  const [schedule, setSchedule] = useState("");
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("http://localhost:8000/api/student-schedule", {
        student: student,
        schedule: schedule,
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
          <h2>Enroll A Student</h2>
          <form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="form-group">
              <label htmlFor="email">student code</label>
              <input
                type="text"
                id="student"
                name="student"
                placeholder="Enter a student code."
                value={student}
                onChange={(e) => setStudent(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Schedule Code</label>
              <input
                type="text"
                id="schedule"
                name="schedule"
                placeholder="Enter Schedule Code"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
            </div>
            {!isloading && (
              <button
                style={{ marginBottom: "10px", marginTop: "20px" }}
                className="create-account-sb-button"
                type="submit"
              >
                Confirm
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EnrollStudent;
