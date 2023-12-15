import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ handleLogin, isAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    const configuration = {
      method: "post",
      url: "http://localhost:8000/api/login",
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        console.log(result.data);
        const userRole = result.data.role;
        const userId = result.data.id;
        handleLogin(userRole, userId);
        navigate("/home");
      })
      .catch((error) => {
        setError("Invalid Email or password.");
      });
  };

  return (
    <div className="login-register-form">
      <div
        className="login-register-box"
        style={{
          maxWidth: "500px",
          width: "80%", // Adjust the width percentage as needed
          margin: "0 auto",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Sign in to your Account</h2>
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
              style={{ marginBottom: "20px" }}
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
              style={{ marginBottom: "20px" }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{ width: "100%", marginTop: "10px", marginBottom: "30px" }}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
