import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Loader from "./loader";

function Course() {
  const [course, setCourse] = useState([]);
  const [searchText, setSearchText] = useState("");
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
        backgroundColor: "#88f0b3",
        color: "rgb(33, 37, 33)",
      },
    },
  };
  return (
    <div className="table-container">
      <div className="group">
        <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          placeholder="Search by courseAv or Department"
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
            Array.isArray(course)
              ? course.filter((item) => {
                  const courseAVMatch = item.courseAv
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

export default Course;
