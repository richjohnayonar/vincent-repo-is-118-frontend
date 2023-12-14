import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../Page.css";
// import * as FaIcons from "react-icons/fa";
// import { Link, Navigate } from "react-router-dom";

function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getSchedule = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user");
      setSchedule(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

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
      </div>
      <DataTable
        columns={columns}
        data={schedule.filter((item) =>
          item.email.toLowerCase().includes(searchText.toLowerCase())
        )}
        pagination
        customStyles={customStyles}
      />
    </div>
  );
}

export default Schedule;
