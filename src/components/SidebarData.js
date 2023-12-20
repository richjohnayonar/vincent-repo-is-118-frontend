import React from "react";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    cName: "nav-text",
    role: ["user", "admin", "editor"],
  },
  {
    title: "Schedule",
    path: "/schedule",
    cName: "nav-text",
    role: "user",
  },
  {
    title: "My Payment Status",
    path: "/myPayment-status",
    icon: <FaIcons.FaMoneyCheckAlt />,
    cName: "nav-text",
    role: "user",
  },
  {
    title: "My Assigned Subjects",
    path: "/assigned-subject",
    cName: "nav-text",
    role: "admin",
  },
  {
    title: "My Schedule",
    path: "/instructor-schedule",
    cName: "nav-text",
    role: "admin",
  },
  {
    title: "Student Information",
    path: "/student-info",
    cName: "nav-text",
    role: "admin",
  },
  {
    title: "Enroll A Student",
    path: "/enroll-student",
    cName: "nav-text",
    role: "admin",
  },
  {
    title: "Users Account",
    path: "/users-account",
    cName: "nav-text",
    role: "editor",
  },
  {
    title: "Assign Subject Instructor",
    path: "/assign-instructor",
    cName: "nav-text",
    role: "editor",
  },
  {
    title: "Assign Schedule",
    path: "/assign-instructor-schedule",
    cName: "nav-text",
    role: "editor",
  },
  {
    title: "Billing",
    path: "/billing",
    cName: "nav-text",
    role: "editor",
  },
  {
    title: "More Information",
    path: "/more-information",
    cName: "nav-text",
    role: "editor",
  },
];
