import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../Page.css";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";

function UsersAccount() {
  const [user, setUser] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user");
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
        backgroundColor: "#88f0b3",
        color: "rgb(33, 37, 33)",
      },
    },
  };

  return (
    <>
      <div
        style={{
          background: "white",
          paddingBottom: "60px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginTop: "20px", paddingTop: "10px" }}>USERS ACCOUNT</h2>
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
            <Link to="/create-user-account" className="create-user-btn">
              <span className="text">Create Student Account</span>
              <FaIcons.FaPlus className="plus-icon" />
            </Link>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <DataTable
              columns={columns}
              data={user.filter((item) =>
                item.email.toLowerCase().includes(searchText.toLowerCase())
              )}
              pagination
              customStyles={customStyles}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default UsersAccount;
