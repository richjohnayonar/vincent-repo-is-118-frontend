// main.js
import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import User from "./pages/user/user";
import OtherUserPage from "./pages/user/otherUserPage";
import Admin from "./pages/instructor/admin";
import OtherAdminPage from "./pages/instructor/otherAdminPage";
import UsersAccount from "./pages/Editor/UsersAccount";
import CreateUsersAccount from "./pages/Editor/createAccount";
import UpdateUser from "./pages/Editor/updateUser";

function Main({ handleLogout, userRole }) {
  return (
    <>
      <Navbar handleLogout={handleLogout} userRole={userRole} />
      {/* Pass userRole */}
      <Routes>
        {userRole === "user" ||
        userRole === "admin" ||
        userRole === "editor" ? (
          <>
            <Route path="/user" element={<User />} />
            <Route path="/other-user-page" element={<OtherUserPage />} />
          </>
        ) : null}
        {userRole === "admin" || userRole === "editor" ? (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/other-admin-page" element={<OtherAdminPage />} />
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
