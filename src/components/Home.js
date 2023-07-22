import React, { useState } from "react";
import * as XLXS from "xlsx";
import { VscCloudUpload } from "react-icons/vsc";
import { FaFilter } from "react-icons/fa";

const Home = () => {
  const [excelData, setExcelData] = useState({
    name: "",
    data: [],
  });
  const fileChange = (e) => {
    const xlsxName = e.target.files[0].name;
    const fr = new FileReader();
    fr.readAsBinaryString(e.target.files[0]);
    fr.onload = (event) => {
      const fileData = event.target.result;
      const workbook = XLXS.read(fileData, { type: "binary" });
      const prodMST = workbook.SheetNames[0];
      const prodMstSheet = workbook.Sheets[prodMST];
      const prodMstData = XLXS.utils.sheet_to_json(prodMstSheet);
      setExcelData({
        name: xlsxName,
        data: [...prodMstData],
      });
    };
  };
  console.log("State", excelData);
  return (
    <>
      <div className="search-container">
        <input
          id="search-input"
          type="search"
          placeholder="Search item......."
        />
        <select id="search-by" defaultValue={"Search Criteria"}>
          <option value="Search Criteria" disabled>
            Search Criteria
          </option>
          <option value="option-1">Option 1</option>
          <option value="option-2">Option 2</option>
          <option value="option-3">Option 3</option>
        </select>
        <input id="sheet-number-input" type="number" placeholder="Sheet Num" />
        <label className="custom-file-upload">
          <input
            id="file-input"
            type="file"
            accept=".xlsx"
            onChange={fileChange}
          />
          <VscCloudUpload className="upload-icon" />
          <span> Upload XLSX</span>
        </label>
      </div>
      <h4 id="file-name">{excelData?.name}</h4>
    </>
  );
};

export default Home;
