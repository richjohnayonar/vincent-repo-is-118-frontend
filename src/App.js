// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Main from "./main";
import FirstPage from "./pages/FirstPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );

  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  const handleLogin = (role, id) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserId(id);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    localStorage.setItem("userId", id);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />}></Route>
          <Route
            path="/login"
            element={
              <Login
                handleLogin={handleLogin}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <Main
                  handleLogout={handleLogout}
                  userRole={userRole}
                  userId={userId}
                /> // Pass userRole
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
