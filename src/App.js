import React, { useState } from "react";
import * as XLXS from "xlsx";

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
    <div>
      <h1>React XLS Application</h1>
      <input type="file" accept=".xlsx" onChange={fileChange} />
    </div>
  );
};

export default App;