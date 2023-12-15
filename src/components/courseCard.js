import React from "react";
import book from ".././pages/images/image1.jpg";

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
        <button className="card-int__button">Show</button>
      </div>
    </div>
  );
}

export default courseCard;
