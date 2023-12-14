import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

function UpdatePayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [payment, setPayment] = useState({
    description: "",
    amount: "",
    student: "",
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(
        `http://localhost:8000/api/update-payment/${id}`,
        payment
      );
      setIsLoading(false);
      navigate("/payment-status");
    } catch (error) {
      setError("Error updating user");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getPayment = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/payment/${id}`
        );
        setPayment({
          description: response.data.description,
          amount: response.data.amount,
          student: response.data.student,
          status: response.data.status,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError("Error retrieving user data");
      }
    };
    getPayment();
  }, [id]);

  return (
    <div className="form-container">
      <h2>UPDATE USER</h2>
      <form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="form-group">
          <label htmlFor="email">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={payment.description}
            onChange={(e) =>
              setPayment((prevUser) => ({
                ...prevUser,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Amount</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={payment.amount}
            onChange={(e) =>
              setPayment((prevUser) => ({
                ...prevUser,
                amount: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Student</label>
          <input
            type="text"
            id="student"
            name="student"
            value={payment.student}
            onChange={(e) =>
              setPayment((prevUser) => ({
                ...prevUser,
                student: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={payment.status}
            onChange={(e) =>
              setPayment((prevUser) => ({
                ...prevUser,
                status: e.target.value,
              }))
            }
          />
        </div>
        {!isLoading && (
          <button className="create-account-sb-button" type="submit">
            Confirm Update
          </button>
        )}
      </form>
    </div>
  );
}

export default UpdatePayment;
