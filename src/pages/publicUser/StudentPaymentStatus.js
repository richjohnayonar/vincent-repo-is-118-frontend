import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../Page.css";
import Loader from "../../components/loader";

function StudentPaymentStatus({ userId }) {
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(userId);

  useEffect(() => {
    const getStudentPayment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/student-payment/${userId}`
        );
        setPaymentStatus(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getStudentPayment();
  }, [userId]);

  const columns = [
    {
      name: "DESCRIPTION",
      selector: "description",
      sortable: true,
    },
    {
      name: "AMOUNT",
      selector: "amount",
      sortable: true,
    },
    {
      name: "STATUS",
      selector: "status",
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
        <div>
          <h2 style={{ marginTop: "30px", padding: "10px" }}>MY BALANCE</h2>
        </div>
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <DataTable
              columns={columns}
              data={paymentStatus}
              pagination
              customStyles={customStyles}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentPaymentStatus;
