import React from "react";

function courseCard({ subject }) {
  return (
    <div className="card">
      <p className="card-title">{subject.subjectId}</p>
      <p className="small-desc">{subject.subjectDescription}</p>
      <p style={{ color: "tomato" }} className="small-desc">
        {subject.instructor.instructorName}
      </p>
    </div>
  );
}

export default courseCard;
