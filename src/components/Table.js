import React from "react";

const Table = ({ tableData, columnNames }) => {
  return (
    <table className="xlsx-table">
      <thead>
        <tr>
          {/* <th>Check</th> */}
          {columnNames.map((col, i) => (
            <th key={col + "-" + i}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((ele, i) => {
          const rowVals = Object.values(ele);
          return (
            <tr key={i}>
              {/* <td>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      console.log(e.target);
                    }}
                  />
                </td> */}
              {rowVals.map((r, i) => (
                <td key={r + "-" + i}>{r}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
