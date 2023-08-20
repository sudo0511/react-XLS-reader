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
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      const modData = prodMstData.map((ele) => {
        return {
          Check: false,
          ...ele,
        };
      });
      setExcelData({
        name: xlsxName,
        data: [...modData],
      });
    };
  };
  // filter records
  const handleSearch = (e) => {
    if (searchQuery !== "") {
      let filteredData = [...excelData.data];
      filteredData = filteredData.filter((ele) => {
        return `${ele[searchKey]}+''`.toLowerCase().includes(searchQuery);
      });
      setFilterData([...filteredData]);
    } else {
      setFilterData([...excelData.data]);
    }
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
    const timerId = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchQuery, excelData]);

  return (
    <>
      <div className="search-container">
        <input
          id="search-input"
          type="search"
          placeholder="Search item......."
          title="Select criteria and search"
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={searchKey != "" ? false : true}
        />
        <select
          id="search-by"
          defaultValue={"Search Criteria"}
          onChange={(e) => setSearchKey(e.target.value)}
        >
          <option value="Search Criteria" disabled>
            Search Criteria
          </option>
          {columnNames.length > 0 &&
            columnNames.map((col, i) => {
              return (
                i !== 0 && (
                  <option key={col + "-" + i} value={col}>
                    {col}
                  </option>
                )
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
            <Table tableData={filterData} columnNames={columnNames} />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
