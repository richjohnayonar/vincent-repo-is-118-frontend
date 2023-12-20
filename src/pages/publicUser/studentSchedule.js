import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../Page.css";
import Loader from "../../components/loader";

function Schedule({ userId }) {
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maxLength, setMaxLength] = useState(200); // Default maxLength

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/schedule-studentId/${userId}`
        );
        setSchedule(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
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

  const columns = [
    {
      name: "TIME",
      selector: "scheduleInfo.time",
      sortable: true,
    },
    {
      name: "DAY",
      selector: "scheduleInfo.day",
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
          {truncateDescription(row.subjectInfo?.subjectDescription)}
        </span>
      ),
      style: {
        textAlign: "left",
      },
      headerStyle: {
        textAlign: "left",
      },
    },
    {
      name: "INSTRUCTOR",
      selector: "instructorInfo.instructorName",
      sortable: true,
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
    <div>
      <div className="table-container">
        <h2 style={{ marginTop: "30px", padding: "10px" }}>MY SCHEDULE</h2>
        {isLoading ? (
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
    </div>
  );
}

export default Schedule;
