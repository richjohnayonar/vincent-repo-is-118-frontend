// main.js
import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/publicUser/Home";
import StudentSched from "./pages/publicUser/studentSchedule";
import AssignedSubject from "./pages/instructor/assignedSubject";
import InstructorSchedule from "./pages/instructor/instructorSchedule";
import UsersAccount from "./pages/Editor/UsersAccount";
import CreateUsersAccount from "./pages/Editor/createAccount";
import UpdateUser from "./pages/Editor/updateUser";
import Subject from "./pages/instructor/subjects";
import SubjectDetail from "./pages/instructor/subjectDetail";

function Main({ handleLogout, userRole, userId }) {
  return (
    <>
      <Navbar handleLogout={handleLogout} userRole={userRole} />
      {/* Pass userRole */}
      <Routes>
        {userRole === "user" ||
        userRole === "admin" ||
        userRole === "editor" ? (
          <>
            <Route path={"/home"} element={<Home userId={userId} />} />
          </>
        ) : null}
        {userRole === "user" && (
          <>
            <Route path="/schedule" element={<StudentSched />} />
          </>
        )}
        {userRole === "admin" ? (
          <>
            <Route
              path="/assigned-subject"
              element={<AssignedSubject userId={userId} />}
            />
            <Route
              path="/instructor-schedule"
              element={<InstructorSchedule userId={userId} />}
            />
            <Route path={`/subject/${userId}`} element={<Subject />} />
            <Route
              path="/subject-detail/:id"
              element={<SubjectDetail userId={userId} />}
            />
          </>
        ) : null}
        {userRole === "editor" ? (
          <>
            <Route path="/users-account" element={<UsersAccount />} />
            <Route path="/update-user/:id" element={<UpdateUser />} />
            <Route
              path="/create-user-account"
              element={<CreateUsersAccount />}
            />
            {/*<Route path="/other-user-page" element={<OtherUserPage />}/> */}
          </>
        ) : null}
      </Routes>
    </>
  );
}

export default Main;
