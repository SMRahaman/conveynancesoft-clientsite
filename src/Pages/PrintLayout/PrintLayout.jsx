import React, { useContext, useRef } from "react";
import useUserHook from "../../Hook/useUserHook";
import { AuthContext } from "../../context/AuthContextProvider";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { reportContext } from "../../context/ReportFilterContextProvider";

const PrintLayout = ({}) => {
  const { user } = useContext(AuthContext);
  const { filterData } = useContext(reportContext);
  const [userData] = useUserHook();
  const specificUser = userData.find(
    (users) => users?.userEmail === user?.email
  );
  const initialValue = 0;
  const sumWithInitial = filterData?.reduce(
    (accumulator, currentValue) => parseInt(accumulator + currentValue.Amount),
    initialValue
  );
  const now = new Date().toDateString();
  const location = useLocation();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <div ref={componentRef} className=" bg-white  my-5 p-2 mx-5">
        <div>
          <h2 className="text-center text-black text-[20px] font-bold mb-2">
            Conveynance-Expenditure Statement
          </h2>
        </div>
        <div className="bg-green-500 py-3">
          <h3 className="text-black font-bold text-center text-[18px]">
            {specificUser?.useCompanyName}
          </h3>
        </div>
        <div>
          <p className="text-black text-xs text-center mt-2">
            55, Shonim Tower, Shah mokhdum Avenue, Sector-12, Uttara,
            Dhaka-1230, Bangladesh
          </p>
        </div>
        <div className="flex w-[100%] mt-2">
          <div className="w-[50%] border border-black text-black text-xs px-2 py-1">
            Name: {specificUser?.userName}
          </div>
          <div className="w-[50%] border border-black text-black text-xs px-2 py-1">
            Designation: {specificUser?.userDesignation}
          </div>
        </div>
        <div className="flex w-[100%] mt-2">
          <div className="w-[50%] border border-black text-black text-xs px-2 py-1">
            Department: {specificUser?.userDepartment}
          </div>
          <div className="w-[50%] border border-black text-black text-xs px-2 py-1">
            Date: {now}
          </div>
        </div>
        <div className="mt-3">
          <table className="text-black border-collapse border border-black w-full">
            <thead className="text-sm text-center">
              <tr>
                <th className="border border-black px-5">Date(Y-M-D)</th>
                <th className="border border-black px-8">From</th>
                <th className="border border-black px-8">To</th>
                <th className="border border-black px-5">Purpose of visit</th>
                <th className="border border-black px-3">Made of transport</th>
                <th className=" border border-black px-3">Amount (Tk.)</th>
              </tr>
            </thead>
            <tbody className="text-xs text-center">
              {filterData?.map((data) => (
                <tr>
                  <td className="border border-black">{data.Date}</td>
                  <td className="border border-black">{data.From}</td>
                  <td className="border border-black">{data.To}</td>
                  <td className="border border-black">{data.PurposeOfVisit}</td>
                  <td className="border border-black">
                    {data.MadeofTransport}
                  </td>
                  <td className="border border-black">{data.Amount}</td>
                </tr>
              ))}
              <tr>
                <td className="border border-black font-bold">
                  Signature of employee
                </td>
                <td className="border border-black font-bold" colSpan={2}></td>
                <td
                  className="border border-black font-bold text-right pe-2"
                  colSpan={2}
                >
                  Total
                </td>
                <td className="border border-black font-bold">
                  {sumWithInitial}
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black font-bold text-center"
                  rowSpan={2}
                >
                  Approvals
                </td>
                <td className="border border-black font-bold align-text-top pb-10">
                  Team Lead:
                </td>
                <td className="border border-black font-bold align-text-top pb-10">
                  Line Manager:
                </td>
                <td className="border border-black font-bold align-text-top pb-10 ">
                  Head of Concern:
                </td>
                <td
                  className="border border-black font-bold align-text-top pb-10"
                  colSpan={2}
                >
                  Local Admin:
                </td>
              </tr>
              <tr>
                <td className="border border-black font-bold align-text-top pb-10">
                  Central Admin:
                </td>
                <td className="border border-black font-bold align-text-top pb-10">
                  Accounts:
                </td>
                <td className="border border-black font-bold align-text-top pb-10 ">
                  Audit:
                </td>
                <td
                  className="border border-black font-bold align-text-top pb-10"
                  colSpan={2}
                >
                  Director:
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {location.pathname === "/conveynance-print-layout" && (
          <div className="text-right mx-5">
            <button
              onClick={handlePrint}
              className="btn btn-primary text-white border-white"
            >
              Print this out!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintLayout;
