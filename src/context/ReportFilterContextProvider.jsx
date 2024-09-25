import React, { useState } from "react";
import { createContext } from "react";
export const reportContext = createContext();
const ReportFilterContextProvider = ({ children }) => {
  const [filterData, setFilterData] = useState(null);
  return (
    <reportContext.Provider value={{ filterData, setFilterData }}>
      {children}
    </reportContext.Provider>
  );
};

export default ReportFilterContextProvider;
