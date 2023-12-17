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
    icon: <FaIcons.FaCalendarDay />,
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
    icon: <FaIcons.FaBook />,
    cName: "nav-text",
    role: "admin",
  },
  {
    title: "My Schedule",
    path: "/instructor-schedule",
    icon: <FaIcons.FaCalendar />,
    cName: "nav-text",
    role: "admin",
  },
  {
    title: "Enroll A Student",
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
  {
    title: "Assign Schedule",
    path: "/assign-instructor-schedule",
    icon: <FaIcons.FaCalendarCheck />,
    cName: "nav-text",
    role: "editor",
  },
  {
    title: "Billing",
    path: "/billing",
    icon: <FaIcons.FaDollarSign />,
    cName: "nav-text",
    role: "editor",
  },
  {
    title: "Payment Status",
    path: "/payment-status",
    icon: <FaIcons.FaMoneyCheckAlt />,
    cName: "nav-text",
    role: "editor",
  },
];
