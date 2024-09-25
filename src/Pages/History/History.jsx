import { axiosPublic } from "../../Hook/useAxiosPublic";
import { DataTable } from "mantine-datatable";
import { ActionIcon, Box, Group } from "@mantine/core";
import { NavLink, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
const PAGE_SIZES = [15, 10, 20];
const History = () => {
  const [loader, setLoader] = useState(true);
  const historyData = useLoaderData();
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  useEffect(() => {
    setPage(1);
    setLoader(false);
  }, [pageSize]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(historyData.slice(0, pageSize));
  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(historyData.slice(from, to));
    setLoader(false);
  }, [page, pageSize]);
  return (
    <div className="grow p-3  ">
      <h2 className="text-2xl mb-4">User Data Record</h2>
      <div className="text-xs">
        <DataTable
          striped
          minHeight={300}
          style={{
            border: "1px solid #40C057",
            fontStyle: "italic",
          }}
          withTableBorder
          withColumnBorders
          columns={[
            {
              accessor: "index",
              title: "SL",
              textAlign: "center",
              width: 40,
              render: (record) => records.indexOf(record) + 1,
            },
            {
              accessor: "userName",
              textAlign: "center",
              title: <Box mx={6}>Name</Box>,
              width: 100,
            },
            {
              accessor: "userEmail",
              textAlign: "center",
              title: <Box mx={6}>Email</Box>,
              width: 150,
            },
            {
              accessor: "startDate",
              textAlign: "center",
              title: <Box mx={6}>Start Date(Y-M-D)</Box>,
              width: 110,
            },
            {
              accessor: "endDate",
              textAlign: "center",
              title: (
                <Box textAlign="center" mx={6}>
                  End Date(Y-M-D)
                </Box>
              ),
              width: 110,
            },
            {
              accessor: "withdrawDate",
              textAlign: "center",
              title: <Box mx={6}>Withdraw Date</Box>,
              width: 120,
            },
            {
              accessor: "totalAmout",
              textAlign: "center",
              title: <Box mx={6}>Amount</Box>,
              width: 120,
            },
          ]}
          totalRecords={historyData?.length}
          records={records ? historyData : []}
          fetching={loader}
          paginationActiveBackgroundColor="grape"
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
        />
      </div>
    </div>
  );
};

export default History;
