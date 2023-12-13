// Navbar.js
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { SidebarData } from "./SidebarData";

function Navbar({ handleLogout, userRole }) {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogoutClick = () => {
    handleLogout(); // Update authentication status to false
    navigate("/login"); // Redirect to login page
  };

  const getLinksBasedOnRole = () => {
    if (userRole === "user") {
      return SidebarData.filter((item) => item.role === "user");
    } else if (userRole === "admin") {
      return SidebarData.filter(
        (item) => item.role === "admin" || item.role === "user"
      );
    } else if (userRole === "editor") {
      return SidebarData.filter(
        (item) =>
          item.role === "editor" ||
          item.role === "admin" ||
          item.role === "user"
      );
    }
    return [];
  };
  const navLinks = getLinksBasedOnRole();

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <FaIcons.FaTimes onClick={showSidebar} />
              </Link>
            </li>
            {navLinks.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
            <li className="nav-text logout">
              <Link to="#" onClick={handleLogoutClick}>
                <FaIcons.FaSignOutAlt />
                <span>Sign Out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
