import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Loader from "./loader";
import "./searchBar.css";

function Instructor() {
  const [instructor, setInstructor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/instructor"
        );
        setInstructor(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setLoading(false);
        setInstructor([]);
      }
    };
    getCourse();
  }, []);

  // Define columns for the DataTable
  const columns = [
    {
      name: "NAME",
      selector: "instructorName",
      sortable: true,
    },
    {
      name: "INSTRUCTOR ID",
      selector: "instructorId",
    },
    {
      name: "DEPARTMENT",
      selector: "department.administration",
    },
    {
      name: "INSTRUCTOR CODE",
      selector: "_id",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "rgb(247, 125, 50)",
        color: "rgb(33, 37, 33)",
      },
    },
    pagination: {
      style: {
        marginBottom: "50px", // Add margin bottom to pagination
      },
    },
  };

  return (
    <div className="table-container">
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          data={instructor}
          pagination
          customStyles={customStyles}
        />
      )}
    </div>
  );
}

export default Instructor;
