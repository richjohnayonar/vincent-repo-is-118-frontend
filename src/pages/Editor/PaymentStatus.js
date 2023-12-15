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
          <div className="search-create-container">
            <div className="search-bar-wrapper">
              <input
                className="search-bar"
                type="text"
                placeholder="Search by student Id"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
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
