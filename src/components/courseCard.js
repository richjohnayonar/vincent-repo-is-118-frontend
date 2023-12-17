import React from "react";
import book from ".././pages/images/image1.jpg";
import { Link } from "react-router-dom";

function courseCard({ subject }) {
  return (
    <div className="card">
      <div className="card__corner"></div>
      <div className="card__img">
        <img className="card__img" src={book} alt="" />
        <span className="card__span">{subject.course.courseAv}</span>
      </div>
      <div className="card-int">
        <p className="card-int__title">{subject.subjectId}</p>
        <p className="excerpt">{subject.subjectDescription}</p>
        <Link to={`/subject-more-details/${subject._id}`}>
          <button className="card-int__button">Show</button>
        </Link>
      </div>
    </div>
  );
}

export default courseCard;
