import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../Editor/Editor.css";

function InstructorSchedule({ userId }) {
  const [schedule, setSchedule] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [maxLength, setMaxLength] = useState(200); // Default maxLength

  const getSchedule = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/schedule/${userId}`
      );
      setSchedule(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      setLoading(false);
      setSchedule([]);
    }
  };

  useEffect(() => {
    getSchedule();
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
      sortable: true,
    },
    {
      name: "SUBJECT ID",
      selector: "subjectInfo.subjectId",
      sortable: true,
    },
    {
      name: "SUBJECT DESCRIPTION",
      selector: "subjectInfo.subjectDescription",
      cell: (row) => (
        <span
          title={row.subjectInfo?.subjectDescription} // Optional chaining to handle potential undefined
          className="subject-description-cell"
        >
          {truncateDescription(row.subjectInfo?.subjectDescription)}{" "}
          {/* Optional chaining */}
        </span>
      ),
      style: {
        textAlign: "left",
      },
      headerStyle: {
        textAlign: "left",
      },
    },
  ];

  return (
    <div className="table-container">
      <div className="search-create-container">
        <div className="search-bar-wrapper">
          <input
            className="search-bar"
            type="text"
            placeholder="Search by Subject ID or Day"
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
            Array.isArray(schedule)
              ? schedule.filter((item) => {
                  const subjectIdMatch = item.subjectInfo?.subjectId
                    ?.toLowerCase()
                    .includes(searchText.toLowerCase());
                  const dayMatch = item.day
                    ?.toLowerCase()
                    .includes(searchText.toLowerCase());
                  return subjectIdMatch || dayMatch;
                })
              : []
          }
          pagination
        />
      )}
    </div>
  );
}

export default InstructorSchedule;
