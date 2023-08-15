import React, { useEffect, useRef, useState } from "react";
import * as XLXS from "xlsx";
import { VscCloudUpload, VscCopy, VscChromeClose } from "react-icons/vsc";
import { SlClose } from "react-icons/sl";

import Table from "./Table";

const Home = () => {
  const [excelData, setExcelData] = useState({
    name: "",
    data: [],
  });
  const fileRef = useRef(null);
  const [searchKey, setSearchKey] = useState("");
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
  const handleSearchBy = (e) => {
    setSearchKey(e.target.value);
  };

  const filterRecords = (e) => {
    const filteredData = excelData.data.filter((ele) => {
      return `${ele[searchKey]}+''`.includes(e.target.value);
    });
    setExcelData((prev) => {
      return {
        ...prev,
        data: [...filteredData],
      };
    });
    console.log(filteredData);
  };
  //to handle file close
  const fileCloseHandler = (e) => {
    fileRef.current.value = null;
    setExcelData({
      name: "",
      data: [],
    });
    setSearchKey("");
  };
  let columnNames =
    excelData.data.length > 0 ? Object.keys(excelData.data[0]) : [];
  useEffect(() => {
    console.log("RENDERED", excelData, columnNames, fileRef);
  });
  return (
    <>
      <div className="search-container">
        <input
          id="search-input"
          type="search"
          placeholder="Search item......."
          onChange={filterRecords}
        />
        <select
          id="search-by"
          defaultValue={"Search Criteria"}
          onChange={handleSearchBy}
        >
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
            ref={fileRef}
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
