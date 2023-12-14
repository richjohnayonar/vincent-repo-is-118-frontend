import React, { useState, useRef } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import Student from "../../components/student";

function Billing() {
  // State to manage form fields
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [student, setStudent] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);

  // Ref for the form container
  const formRef = useRef(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("http://localhost:8000/api/payment", {
        description: description,
        amount: amount,
        student: student,
        status: status,
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
      {!isloading && (
        <div>
          {" "}
          <div
            style={{
              background: "white",
              padding: "20px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                textAlign: "left",
                marginTop: "30px",
                marginLeft: "20px",
              }}
            >
              <button className="assignInstructorButton" onClick={scrollToForm}>
                Billing
                <FaIcons.FaPlus style={{ marginLeft: "8px" }} />
              </button>
            </p>
            <Student />
          </div>
          <div>
            <div
              style={{
                background: "white",
                paddingBottom: "100px",
                paddingTop: "20px",
              }}
            >
              <div ref={formRef} className="form-container">
                <h2>Billing</h2>
                <form onSubmit={handleSubmit}>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <div className="form-group">
                    <label htmlFor="email">Description</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Amount</label>
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Student Code</label>
                    <input
                      type="text"
                      id="student"
                      name="student"
                      placeholder="Student Code"
                      value={student}
                      onChange={(e) => setStudent(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Status</label>
                    <input
                      type="text"
                      id="status"
                      name="status"
                      placeholder="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
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
        </div>
      )}
    </div>
  );
}

export default Billing;
