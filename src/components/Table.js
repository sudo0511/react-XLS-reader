import React, { useEffect, useRef, useState } from "react";

const Table = ({ tableData, columnNames, handleCheck }) => {
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
        {tableData.map((ele, index) => {
          const rowVals = Object.values(ele);
          return (
            <tr key={index}>
              {rowVals.map((r, i) =>
                i === 0 ? (
                  <td key={r + "-" + i}>
                    <input
                      type="checkbox"
                      checked={r}
                      onChange={() => handleCheck(ele, index)}
                    />
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
