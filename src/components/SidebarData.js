import React from "react";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <FaIcons.FaHome />,
    cName: "nav-text",
    role: ["user", "admin", "editor"],
  },
  {
    title: "Schedule",
    path: "/schedule",
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
    title: "Schedule",
    path: "/instructor-schedule",
    icon: <FaIcons.FaUserLock />,
    cName: "nav-text",
    role: ["admin"],
  },
  {
    title: "Users Account",
    path: "/users-account",
    icon: <FaIcons.FaUserLock />,
    cName: "nav-text",
    role: "editor",
  },
];
