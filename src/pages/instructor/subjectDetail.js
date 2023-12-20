import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../Page.css";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";

function SubjectDetail() {
  const { id } = useParams();
  const [subject, setSubject] = useState([]);
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const [maxLength, setMaxLength] = useState(200);

  useEffect(() => {
    const getSubject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/subject-detail/${id}`
        );
        setSubject(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getSubject();
  }, [id]); // Include 'id' in the dependency array

  useEffect(() => {
    const getEnrolledStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/student-schedule/${id}`
        );
        setStudent(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getEnrolledStudent();
  }, [id]); // Include 'id' in the dependency array

  const columns = [
    {
      name: "NAME",
      selector: "studentInfo.studentName",
      sortable: true,
    },
    {
      name: "ID",
      selector: "studentInfo.studentId",
      sortable: true,
    },
    {
      name: "YEAR",
      selector: "studentInfo.yearLevel",
      sortable: true,
    },
    {
      name: "COURSE",
      selector: "courseInfo.courseAv",
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
    <>
      <div
        style={{
          paddingBottom: "100px",
        }}
      >
        <h2>
          <span>{subject.subjectId}</span> - {subject.subjectDescription}
        </h2>
        <div>
          <h2>Enrolled Student</h2>
        </div>
        <div className="table-container">
          {loading ? (
            <Loader />
          ) : (
            <DataTable
              columns={columns}
              data={student}
              pagination
              customStyles={customStyles}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default SubjectDetail;
