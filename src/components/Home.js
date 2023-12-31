import React, { useEffect, useRef, useState } from "react";
import * as XLXS from "xlsx";
import { VscCloudUpload, VscCloudDownload } from "react-icons/vsc";
import { SlClose } from "react-icons/sl";
import Table from "./Table";
import { nanoid } from "nanoid";
import FileSaver from "file-saver";

const Home = () => {
  const [excelData, setExcelData] = useState({
    name: "",
    data: [],
  });
  const fileRef = useRef(null);
  const [searchKey, setSearchKey] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedVals, setCheckedVals] = useState([]);

  //read uploaded excel file
  const fileImport = (e) => {
    const xlsxName = e.target.files[0].name;
    const fr = new FileReader();
    fr.readAsBinaryString(e.target.files[0]);
    let id = Symbol("id");
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
          [id]: nanoid(),
        };
      });
      setExcelData({
        name: xlsxName,
        data: [...modData],
      });
    };
  };

  //export to excel with checked values
  const fileExport = (e) => {
    console.log(checkedVals);
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLXS.utils.json_to_sheet(checkedVals);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLXS.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "BookX" + fileExtension);
  };

  // filter records
  const handleSearch = (e) => {
    if (searchQuery !== "") {
      let filteredData = [...excelData.data];
      filteredData = filteredData.filter((ele) => {
        return `${ele[searchKey]}+''`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
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
    setSearchQuery("");
    setSearchKey("");
  };

  //to handle checked rows
  const handleCheck = (ele, index) => {
    const checkedReacordId = ele[Object.getOwnPropertySymbols(ele)[0]];
    const tempArr = excelData.data.map((obj) => {
      return obj[Object.getOwnPropertySymbols(obj)[0]] === checkedReacordId
        ? { ...obj, Check: !obj["Check"] }
        : obj;
    });
    setExcelData((prev) => {
      return {
        ...prev,
        data: [...tempArr],
      };
    });
    if (!ele["Check"]) {
      setCheckedVals((prev) => [...prev, ele]);
    } else {
      if (checkedVals.length > 0) {
        const tempVals = checkedVals.filter((o) => {
          return !(o[Object.getOwnPropertySymbols(o)[0]] === checkedReacordId);
        });
        setCheckedVals([...tempVals]);
      }
    }
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
        {/* <input id="sheet-number-input" type="number" placeholder="Sheet Num" /> */}
        <label className="custom-file-upload">
          <input
            id="file-input"
            type="file"
            accept=".xlsx"
            onChange={fileImport}
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
              <button
                id="btn-export-items"
                title="Export Selected Items"
                onClick={fileExport}
              >
                <VscCloudDownload
                  style={{
                    position: "relative",
                    top: "2px",
                  }}
                />
              </button>
            </div>
          </div>
          <div className="table-wrapper">
            <Table
              tableData={filterData}
              columnNames={columnNames}
              handleCheck={handleCheck}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
