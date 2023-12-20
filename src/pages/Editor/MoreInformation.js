import React from "react";
import Student from "../../components/student";
import Instructor from "../../components/Instructor";
import Course from "../../components/course";
import Subject from "../../components/subjects";

function MoreInformation() {
  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <Student />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2 style={{ padding: "20px" }}>INSTRUCTOR</h2>
        <Instructor />
      </div>
      <div>
        <h2 style={{ padding: "20px" }}>COURSE</h2>
        <Course />
      </div>
      <div style={{ paddingBottom: "100px" }}>
        <h2 style={{ marginTop: "20px", padding: "20px" }}>SUBJECTS</h2>
        <Subject />
      </div>
    </div>
  );
}

export default MoreInformation;
