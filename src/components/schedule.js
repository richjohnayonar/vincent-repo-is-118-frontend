import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Loader from "./loader";

function Course({ userId }) {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxLength, setMaxLength] = useState(200); // Default maxLength

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/schedule/${userId}`
        );
        setSchedule(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setLoading(false);
        setSchedule([]);
      }
    };
    getCourse();
  }, [userId]);

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
      name: "TIME",
      selector: "time",
      sortable: true,
    },
    {
      name: "DAY",
      selector: "day",
    },
    {
      name: "SUBJECT ID",
      selector: "subjectInfo.subjectId",
    },
    {
      name: "INSTRUCTOR CODE",
      selector: "instructorInfo.instructorName",
    },
    {
      name: "SCHEDULE CODE",
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
        backgroundColor: "rgb(247, 125, 50)",
        color: "rgb(33, 37, 33)",
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
          data={schedule}
          pagination
          customStyles={customStyles}
        />
      )}
    </div>
  );
}

export default Course;
