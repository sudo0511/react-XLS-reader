import React, { useState } from "react";
import * as XLXS from "xlsx";
import { VscCloudUpload, VscCopy, VscChromeClose } from "react-icons/vsc";
import { SlClose } from "react-icons/sl";

import Table from "./Table";

const Home = () => {
  const [excelData, setExcelData] = useState({
    name: "",
    data: [],
  });
  //read uploaded excel file
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
  //to handle file close
  const fileCloseHandler = (e) => {
    setExcelData({
      name: "",
      data: [],
    });
  };
  let columnNames =
    excelData.data.length > 0 ? Object.keys(excelData.data[0]) : [];
  // console.log("State", excelData);
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
          {columnNames.length > 0 &&
            columnNames.map((col, i) => {
              return (
                <option key={col + "-" + i} value={col}>
                  {col}
                </option>
              );
            })}
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

      {excelData?.name && (
        <>
          <div className="file-handle-wrapper">
            <div id="file-name">
              <span>{excelData?.name} </span>
              <button
                id="btn-file-close"
                title="Close File"
                onClick={fileCloseHandler}
              >
                <SlClose
                  style={{
                    position: "relative",
                    top: "2px",
                  }}
                />
              </button>
              <button id="btn-copy-items" title="Copy Items">
                <VscCopy
                  style={{
                    position: "relative",
                    top: "2px",
                  }}
                />
              </button>
            </div>
          </div>
          <div className="table-wrapper">
            <Table tableData={excelData.data} columnNames={columnNames} />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
