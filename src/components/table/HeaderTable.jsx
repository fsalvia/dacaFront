import React from "react";

export const HeaderTable = ({
  columns,
  selectAll = null,
  handleSelectAll = null,
}) => {
  return (
    <thead className="bg-gray-800 text-gray-300">
      <tr key={"head"}>
        {handleSelectAll && (
          <th key={"selectAll"}>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </th>
        )}
        {columns.map((column, index) => (
          <th key={index} className="p-2">
            <label size="paragraphM" bold="true">
              {column}
            </label>
          </th>
        ))}
      </tr>
    </thead>
  );
};
