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
    title: "Assigned Subjects",
    path: "/assigned-subject",
    icon: <FaIcons.FaBook />,
    cName: "nav-text",
    role: "admin",
  },
  {
    title: "MySchedule",
    path: "/instructor-schedule",
    icon: <FaIcons.FaCalendar />,
    cName: "nav-text",
    role: "admin",
  },
  {
    title: "Enroll Student",
    path: "/enroll-student",
    icon: <FaIcons.FaBook />,
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
  {
    title: "Assign Subject Instructor",
    path: "/assign-instructor",
    icon: <FaIcons.FaChalkboardTeacher />,
    cName: "nav-text",
    role: "editor",
  },
];
