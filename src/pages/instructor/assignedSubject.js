import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../Page.css";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";

function AssignedSubject({ userId }) {
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxLength, setMaxLength] = useState(200); // Default maxLength

  useEffect(() => {
    const getSubject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/subject/${userId}`
        );
        setSubject(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setLoading(false);
        setSubject([]);
      }
    };
    getSubject();
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
      name: "SUBJECT ID",
      selector: "subjectId",
      sortable: true,
    },
    {
      name: "SUBJECT DESCRIPTION",
      selector: "subjectDescription",
      cell: (row) => (
        <span title={row.subjectDescription}>
          {truncateDescription(row.subjectDescription)}
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
      name: "COURSE",
      selector: "courseInfo.courseAv",
      sortable: true,
    },
    {
      name: "More Details",
      cell: (row) => (
        <div>
          <Link to={`/subject-detail/${row._id}`}>
            <h3 className="view-more">View more details</h3>
          </Link>
        </div>
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
    <div>
      <div className="table-container">
        <h2 style={{ marginTop: "10px", padding: "10px" }}>Assined Subjects</h2>

        {loading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={subject}
            pagination
            customStyles={customStyles}
          />
        )}
      </div>
    </div>
  );
}

export default AssignedSubject;
