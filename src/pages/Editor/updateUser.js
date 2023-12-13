import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
    id: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Check if the password is empty (indicating it hasn't been changed)
      if (!user.password.trim()) {
        // If the password is not provided, remove it from the user object
        const { password, ...updatedUser } = user;
        await axios.put(
          `http://localhost:8000/api/userUpdate/${id}`,
          updatedUser
        );
      } else {
        // If a new password is provided, proceed with the full user object
        await axios.put(`http://localhost:8000/api/userUpdate/${id}`, user);
      }
      setIsLoading(false);
      navigate("/users-account");
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Email already in use."
      ) {
        setError("Email already in use. Please use a different email.");
      } else {
        setError("Error updating user");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${id}`
        );
        setUser({
          email: response.data.email,
          password: response.data.password,
          role: response.data.role,
          id: response.data.id,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError("Error retrieving user data");
      }
    };
    getUser();
  }, [id]);

  return (
    <div className="form-container">
      <h2>UPDATE USER</h2>
      <form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) =>
              setUser((prevUser) => ({ ...prevUser, email: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={(e) =>
              setUser((prevUser) => ({ ...prevUser, password: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="password">Student ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={user.id}
            onChange={(e) =>
              setUser((prevUser) => ({ ...prevUser, id: e.target.value }))
            }
          />
        </div>
        {!isLoading && (
          <button className="create-account-sb-button" type="submit">
            Update Account
          </button>
        )}
      </form>
    </div>
  );
}

export default UpdateUser;
