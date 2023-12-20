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
    handleLogout();
    navigate("/login");
  };

  const getLinksBasedOnRole = () => {
    return SidebarData.filter((item) => {
      if (Array.isArray(item.role)) {
        return item.role.includes(userRole);
      } else {
        return item.role === userRole;
      }
    });
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
                  <span className="nav-span">{item.title}</span>
                </Link>
              </li>
            ))}
            <li className="nav-text logout">
              <Link to="#" onClick={handleLogoutClick}>
                <span className="nav-span">Sign Out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
