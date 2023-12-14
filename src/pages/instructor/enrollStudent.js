import React, { useState, useRef } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import Schedule from "../../components/schedule";
import Student from "../../components/student";

function EnrollStudent({ userId }) {
  // State to manage form fields
  const [student, setStudent] = useState("");
  const [schedule, setSchedule] = useState("");
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);
  console.log(userId);
  // Ref for the form container
  const formRef = useRef(null);

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

  // Function to scroll to the form section
  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div style={{ background: "white", marginBottom: "20px" }}></div>
      <div
        style={{ background: "white", padding: "20px", marginBottom: "20px" }}
      >
        <p style={{ textAlign: "left", marginTop: "30px", marginLeft: "20px" }}>
          <button className="assignInstructorButton" onClick={scrollToForm}>
            ENROLL STUDENT
            <FaIcons.FaPlus style={{ marginLeft: "8px" }} />
          </button>
        </p>
        <Student />
      </div>
      <div
        style={{ background: "white", padding: "20px", marginBottom: "20px" }}
      >
        <h2 style={{ marginTop: "50px" }}>YOUR SUBJECT SCHEDULE</h2>
        <Schedule userId={userId} />
      </div>

      <div
        style={{
          background: "white",
          paddingBottom: "200px",
          paddingTop: "20px",
        }}
      >
        <div ref={formRef} className="form-container">
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
                style={{ marginBottom: "40px", marginTop: "50px" }}
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
