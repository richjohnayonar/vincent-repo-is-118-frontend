import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

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
