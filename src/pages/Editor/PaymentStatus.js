import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../Page.css";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";

function PaymentStatus() {
  const [payment, setPayment] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getPayment = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/payment");
      setPayment(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPayment();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete-payment/${id}`);
      window.location.reload(); // Reload the page after successful deletion
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "DESCRIPTION",
      selector: "description",
    },
    {
      name: "AMOUNT",
      selector: "amount",
      sortable: true,
    },
    {
      name: "STUDENT NAME",
      selector: "student.studentName",
      sortable: true,
    },
    {
      name: "STUDENT ID",
      selector: "student.studentId",
      sortable: true,
    },
    {
      name: "STATUS",
      selector: "status",
      sortable: true,
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <div>
          <Link to={`/update-payment/${row._id}`}>
            <FaIcons.FaUserEdit className="update-style" />
          </Link>
          <FaIcons.FaRegTrashAlt
            className="delete-style"
            onClick={() => handleDelete(row._id)}
          />
        </div>
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
      <div
        style={{
          background: "white",
          paddingBottom: "60px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginTop: "20px", paddingTop: "10px" }}>
          STUDENT PAYMENT STATUS
        </h2>
        <div className="table-container">
          <div className="group">
            <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              placeholder="Search by student ID"
              type="search"
              className="input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <DataTable
              columns={columns}
              data={payment.filter((item) =>
                item.student.studentId
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              )}
              pagination
              customStyles={customStyles}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default PaymentStatus;
