import React, { useRef, useState } from "react";

const Table = ({ tableData, columnNames }) => {
  const rowRef = useRef(null);
  const [checkedVals, setCheckedVals] = useState([]);
  return (
    <table className="xlsx-table">
      <thead>
        <tr>
          {columnNames.map((col, i) => (
            <th key={col + "-" + i}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((ele, i) => {
          const rowVals = Object.values(ele);
          return (
            <tr key={i} ref={rowRef}>
              {rowVals.map((r, i) =>
                i === 0 ? (
                  <td key={r + "-" + i}>
                    <input type="checkbox" />
                  </td>
                ) : (
                  <td key={r + "-" + i}>{r}</td>
                )
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
