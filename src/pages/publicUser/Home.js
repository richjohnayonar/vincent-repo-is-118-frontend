import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../../components/courseCard";
import Loader from "../../components/loader";

function Home() {
  const [subject, setSubject] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSubject = async () => {
      try {
        let url = `http://localhost:8000/api/subjectPage?page=${currentPage}&limit=${subjectPerPage}`;

        const response = await axios.get(url);
        const { models, currentPage: page } = response.data;
        setSubject(models);
        setCurrentPage(page);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getSubject();
  }, [currentPage, subjectPerPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSearch = async () => {
    try {
      let url = `http://localhost:8000/api/subjectPage?page=${currentPage}&limit=${subjectPerPage}&query=${searchQuery}`;
      const response = await axios.get(url);
      const { models, currentPage: page } = response.data;
      setSubject(models);
      setCurrentPage(page);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "50%",
              minWidth: "250px", // Set minimum width to 250px
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                marginRight: "8px",
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "lightblue",
                color: "#fff",
                cursor: "pointer",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Search
            </button>
          </div>
        </div>
        <h2 style={{ marginBottom: "20px" }}>SUBJECTS AND SECTIONS</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="homeContainer">
            {subject.map((subject, index) => (
              <CourseCard key={index} subject={subject} />
            ))}
          </div>
        )}

        <div className="pagination-container">
          <span>Page: {currentPage}</span>
          <div className="pagination-buttons">
            <button
              className="next-prev"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Prev Page
            </button>
            <button
              className="next-prev"
              onClick={nextPage}
              disabled={subject.length < subjectPerPage}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
