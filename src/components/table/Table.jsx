import React from "react";
import FooterTable from "./FooterTable";
import { HeaderTable } from "./HeaderTable";

const Table = ({ children, columns, selectorAlls = null, pagination }) => {
  return (
    <div>
      <table className="w-full mt-5 table-auto shadow bg-gray-300 rounded-t-lg overflow-hidden">
        <HeaderTable
          columns={columns}
          selectAll={selectorAlls?.state}
          handleSelectAll={selectorAlls?.handler}
        />
        {children}
      </table>
      <div className="bg-gray-800 rounded-b-lg">
        {pagination && (
        <FooterTable
          totalPage={pagination.totalPages}
          actualPage={pagination.actualPage}
          changePage={pagination.handlerChangePage}
        />
      )}
      </div>
      
    </div>
  );
};
export default Table;
