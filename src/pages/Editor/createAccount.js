import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

function CreateAccount() {
  // State to manage form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Handle form submission logic here
      if (!email && !password && !id) {
        setError("Please enter all required information.");
        return;
      }
      setIsLoading(true);
      await axios.post("http://localhost:8000/api/register", {
        email: email,
        password: password,
        role: role,
        id,
      });
      setIsLoading(false);
      navigate("/users-account");
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Email already in use."
      ) {
        setError("Email already in use. Please use different email.");
      } else {
        setError("Registration failed. Please try again.");
      }
      setIsLoading(false);
    }
    // Fetch updated user data after submission
  };

  return (
    <>
      <div>
        <div className="form-container">
          <h2>CREATE STUDENT ACCOUNT</h2>
          <form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="password">Student Code</label>
              <input
                type="text"
                id="id"
                name="id"
                placeholder="Enter student code"
                value={id}
                onChange={(e) => setId(e.target.value)}
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
    </>
  );
}

export default CreateAccount;
