import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

function Billing() {
  // State to manage form fields
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [student, setStudent] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);

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

  return (
    <div>
      {!isloading && (
        <div>
          <div>
            <div
              style={{
                background: "white",
                paddingBottom: "100px",
                paddingTop: "20px",
              }}
            >
              <div className="form-container">
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
