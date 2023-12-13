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
  });

  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${id}`);
      setUser({
        email: response.data.email,
        password: response.data.password,
        role: response.data.role,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("Error retrieving user data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:8000/api/userUpdate/${id}`, user);
      setIsLoading(false);
      navigate("/users-account");
    } catch (error) {
      console.error("Error updating user: ", error);
      setIsLoading(false);
      setError("Error updating user");
    }
  };

  useEffect(() => {
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
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
