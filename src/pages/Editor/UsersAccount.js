import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "./Editor.css";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";

function UsersAccount() {
  const [user, setUser] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = (userId) => {
    console.log(`Updating user with ID: ${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/user-delete/${userId}`);
      window.location.reload(); // Reload the page after successful deletion
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "EMAIL",
      selector: "email",
      sortable: true,
    },
    {
      name: "ROLE",
      selector: "role",
      sortable: true,
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <div>
          <Link to={`/update-user/${row._id}`}>
            <FaIcons.FaUserEdit
              className="update-style"
              onClick={() => handleUpdate(row._id)}
            />
          </Link>
          <FaIcons.FaRegTrashAlt
            className="delete-style"
            onClick={() => handleDelete(row._id)}
          />
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "green",
        color: "#fff",
      },
    },
  };

  return (
    <div className="table-container">
      <div className="search-create-container">
        <div className="search-bar-wrapper">
          <input
            className="search-bar"
            type="text"
            placeholder="Search by email"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <Link to="/create-user-account">
          <button className="create-user-btn">Create User</button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={user.filter((item) =>
          item.email.toLowerCase().includes(searchText.toLowerCase())
        )}
        pagination
        customStyles={customStyles}
      />
    </div>
  );
}

export default UsersAccount;
