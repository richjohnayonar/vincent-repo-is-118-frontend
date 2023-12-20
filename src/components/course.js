import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Loader from "./loader";

function Course() {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/course");
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setLoading(false);
        setCourse([]);
      }
    };
    getCourse();
  }, []);

  // Define columns for the DataTable
  const columns = [
    {
      name: "COURSE",
      selector: "courseName",
      sortable: true,
    },
    {
      name: "COURSE AV",
      selector: "courseAv",
    },
    {
      name: "DEPARTMENT",
      selector: "department.administration",
    },
    {
      name: "COURSE CODE",
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
  };
  return (
    <div className="table-container">
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          data={course}
          pagination
          customStyles={customStyles}
        />
      )}
    </div>
  );
}

export default Course;
