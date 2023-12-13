import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email && !password) {
      setError("Email and password are required.");
      return;
    }

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password should be at least 8 and not greater than 30 characters having one uppercase letter and one special character."
      );
      return;
    }

    const configuration = {
      method: "post",
      url: "http://localhost:8000/api/register",
      data: {
        email,
        password,
        role,
      },
    };

    axios(configuration)
      .then((result) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error:", error); // Log the entire error object
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === "Email already in use."
        ) {
          setError("Email already in use. Please use a different email.");
        } else {
          setError("Registration failed. Please try again.");
        }
      });
  };

  return (
    <div className="login-register-form">
      <div className="login-register-box">
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              style={{ marginBottom: "8px" }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ marginBottom: "8px" }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="role"
              style={{ marginBottom: "8px" }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>

        <div style={{ marginTop: "10px", textAlign: "center" }}>
          Already have an account? <Link to="/login">Login now!</Link>
        </div>
      </div>
    </div>
  );
}
