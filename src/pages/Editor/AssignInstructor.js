import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

function AssignInstructor() {
  // State to manage form fields
  const [subjectId, setSubjectId] = useState("");
  const [subDescription, setSubdescription] = useState("");
  const [course, setCourse] = useState("");
  const [instructor, setInstructor] = useState("");
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("http://localhost:8000/api/subject", {
        subjectId: subjectId,
        subjectDescription: subDescription,
        course: course,
        instructor: instructor,
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
      <div className="form-container">
        <h2>Assign Subject Instructor</h2>
        <form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="form-group">
            <label htmlFor="email">Subject & Section</label>
            <input
              type="text"
              id="subjectid"
              name="subjectid"
              placeholder="Eg. ITE 110 - EG1"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Subject Description</label>
            <input
              type="text"
              id="subDescription"
              name="subDescription"
              placeholder="Subject Description"
              value={subDescription}
              onChange={(e) => setSubdescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Course Code</label>
            <input
              type="text"
              id="course"
              name="course"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Instructor Code</label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              placeholder="instructor"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
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
  );
}

export default AssignInstructor;
