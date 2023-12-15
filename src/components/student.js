import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Loader from "./loader";

function Student() {
  const [student, setStudent] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [maxLength, setMaxLength] = useState(200); // Default maxLength

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/student");
        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setLoading(false);
        setStudent([]);
      }
    };
    getCourse();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMaxLength(30); // For smaller screens, update maxLength
      } else {
        setMaxLength(200); // Default maxLength for larger screens
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Truncate text to a specified length for UI display
  const truncateDescription = (text) => {
    return text.length > maxLength
      ? text.substring(0, maxLength - 3) + "..."
      : text;
  };

  // Define columns for the DataTable
  const columns = [
    {
      name: "NAME",
      selector: "studentName",
      sortable: true,
    },
    {
      name: "ID",
      selector: "studentId",
    },
    {
      name: "ADDRESS",
      selector: "studentAddr",
    },
    {
      name: "AGE",
      selector: "studentAge",
    },
    {
      name: "YEAR",
      selector: "yearLevel",
    },
    {
      name: "STUDENT CODE",
      selector: "_id",
      cell: (row) => (
        <span
          title={row._id} // Optional chaining to handle potential undefined
          className="Studen-code-cell"
        >
          {truncateDescription(row._id)}
          {/* Optional chaining */}
        </span>
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
      <h2> STUDENT</h2>
      <div className="table-container">
        <div className="group">
          <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="Search by Name or ID"
            type="search"
            className="input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={
              Array.isArray(student)
                ? student.filter((item) => {
                    const studentMatch = item.studentName
                      ?.toLowerCase()
                      .includes(searchText.toLowerCase());
                    const studentIdMatch = item.studentId
                      ?.toLowerCase()
                      .includes(searchText.toLowerCase());
                    return studentMatch || studentIdMatch;
                  })
                : []
            }
            pagination
            customStyles={customStyles}
          />
        )}
      </div>
    </>
  );
}

export default Student;
