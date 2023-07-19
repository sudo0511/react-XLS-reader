import React, { useState } from "react";
import * as XLXS from "xlsx";
import { VscCloudUpload } from "react-icons/vsc";
import { FaFilter } from "react-icons/fa";

const App = () => {
  const [excelData, setExcelData] = useState([]);
  const fileChange = (e) => {
    console.log(e.target.files[0]);
    const fr = new FileReader();
    fr.readAsBinaryString(e.target.files[0]);
    fr.onload = (event) => {
      const fileData = event.target.result;
      const workbook = XLXS.read(fileData, { type: "binary" });
      const prodMST = workbook.SheetNames[0];
      const prodMstSheet = workbook.Sheets[prodMST];
      const prodMstData = XLXS.utils.sheet_to_json(prodMstSheet);
      console.log(prodMstData);
    };
  };
  return (
    <>
      <nav className="nav-header">
        <header id="heading">XLS reader</header>
        <span id="about">About</span>
        <span id="contact">Contact</span>
      </nav>
      <div className="search-container">
        <input
          id="search-input"
          type="search"
          placeholder="Search item......."
        />
        <label className="custom-file-upload">
          <input
            id="file-input"
            type="file"
            accept=".xlsx .xls"
            onChange={fileChange}
          />
          <VscCloudUpload className="upload-icon" />
          <span> Upload XLSX</span>
        </label>
      </div>
    </>
  );
};

export default App;
