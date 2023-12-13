// SidebarData.js
import React from "react";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "User",
    path: "/user",
    icon: <FaIcons.FaUser />,
    cName: "nav-text",
    role: "user",
  },
  {
    title: "Other User Page",
    path: "/other-user-page",
    icon: <FaIcons.FaUserAlt />,
    cName: "nav-text",
    role: "user",
  },
  {
    title: "Admin",
    path: "/admin",
    icon: <FaIcons.FaUserShield />,
    cName: "nav-text",
    role: "admin",
  },
  {
    title: "Other Admin Page",
    path: "/other-admin-page",
    icon: <FaIcons.FaUserLock />,
    cName: "nav-text",
    role: "admin",
  },
  {
    title: "Users Account",
    path: "/users-account",
    icon: <FaIcons.FaUserLock />,
    cName: "nav-text",
    role: "editor",
  },
];
