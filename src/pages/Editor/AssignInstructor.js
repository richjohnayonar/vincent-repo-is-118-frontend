import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Course from "../../components/course";
import Instructor from "../../components/Instructor";
import * as FaIcons from "react-icons/fa";

function AssignInstructor() {
  // State to manage form fields
  const [subjectId, setSubjectId] = useState("");
  const [subDescription, setSubdescription] = useState("");
  const [course, setCourse] = useState("");
  const [instructor, setInstructor] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);

  // Ref for the form container
  const formRef = useRef(null);

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
      navigate("/users-account");
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
            Assign Instructor
            <FaIcons.FaPlus style={{ marginLeft: "8px" }} />
          </button>
        </p>
        <h2 style={{ marginTop: "50px" }}>INSTRUCTOR</h2>
        <Instructor />
      </div>
      <div
        style={{ background: "white", padding: "20px", marginBottom: "20px" }}
      >
        <h2 style={{ marginTop: "10px" }}>COURSE</h2>
        <Course />
      </div>
      <div
        style={{
          background: "white",
          paddingBottom: "100px",
          paddingTop: "20px",
        }}
      >
        <div ref={formRef} className="form-container">
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
                Create Account
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AssignInstructor;
