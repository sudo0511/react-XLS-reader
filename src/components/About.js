import React from "react";
import { VscCloudDownload } from "react-icons/vsc";

const About = () => {
  return (
    <div className="about-container">
      <h3>Application Summary</h3>
      <hr />
      <p>
        Simple single page web application build using lastest JavaScript
        library React Js v18 and XLSX JavaScript library allowing one to upload,
        filter and export filtered records to a new excel file.
      </p>
      <p>
        <strong>Directions are as follows :-</strong>
      </p>
      <ul className="about-steps-list">
        <li>Upload excel file.</li>
        <li>
          Select search criteria which will consists column names of your excel
          file allowing you to filter by any particular column's field values.
        </li>
        <li>
          Filter using search box and check/select records you want to be in
          final excel file
        </li>
        <li>
          Once done export filtered records by clicking on{" "}
          <VscCloudDownload
            style={{
              position: "relative",
              top: "5px",
              fontSize: "x-large",
            }}
          />{" "}
          icon
        </li>
      </ul>
    </div>
  );
};

export default About;
