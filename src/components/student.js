import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

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
        <div className="search-create-container">
          <div className="search-bar-wrapper">
            <input
              className="search-bar"
              type="text"
              placeholder="Search by courseAv or Department"
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
              Array.isArray(student)
                ? student.filter((item) => {
                    const courseAVMatch = item.studentName
                      ?.toLowerCase()
                      .includes(searchText.toLowerCase());
                    const department = item.studentId
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
    </>
  );
}

export default Student;
