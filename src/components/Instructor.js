import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

function Instructor() {
  const [instructor, setInstructor] = useState([]);
  const [searchText, setSearchText] = useState("");
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
        backgroundColor: "#88f0b3",
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
      <div className="search-create-container">
        <div className="search-bar-wrapper">
          <input
            className="search-bar"
            type="text"
            placeholder="Search by Name or Department"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          columns={columns}
          data={
            Array.isArray(instructor)
              ? instructor.filter((item) => {
                  const courseAVMatch = item.instructorName
                    ?.toLowerCase()
                    .includes(searchText.toLowerCase());
                  const department = item.department?.administration
                    ?.toLowerCase()
                    .includes(searchText.toLowerCase());
                  return courseAVMatch || department;
                })
              : []
          }
          pagination
          customStyles={customStyles}
        />
      )}
    </div>
  );
}

export default Instructor;
