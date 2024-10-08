import React, { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import { ActionIcon, Box, Group } from "@mantine/core";
import { FaEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { NavLink, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosPublic } from "../../Hook/useAxiosPublic";

const PAGE_SIZES = [15, 10, 20];
const ConveynanceView = () => {
  const conveynanceData = useLoaderData();
  const [loader, setLoader] = useState(true);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  useEffect(() => {
    setPage(1);
    setLoader(false);
  }, [pageSize]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(conveynanceData?.slice(0, pageSize));
  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(conveynanceData?.slice(from, to));
  }, [page, pageSize]);

  const conveynanceDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/conveynances/${id}`).then((res) => {
          if (res.data.deletedCount == 1) {
            Swal.fire({
              title: "Congratulation",
              text: "Delete successfully",
              icon: "success",
            });
            setLoader(true);
            const remaining = records.filter((con) => con._id !== id);
            setRecords(remaining);
            setLoader(false);
          }
        });
      }
    });
  };
  return (
    <div className="grow p-3 mt-3">
      <h2 className="text-2xl mb-5">Conveynance Data Record</h2>
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
              accessor: "Date",
              textAlign: "center",
              title: <Box mx={6}>Date (Y-M-D)</Box>,
              width: 100,
            },
            { accessor: "From", title: <Box mx={6}>From</Box>, width: 100 },
            {
              accessor: "To",
              title: <Box mx={6}>To</Box>,
              width: 100,
            },
            {
              accessor: "PurposeOfVisit",
              textAlign: "left",
              title: (
                <Box textAlign="center" mx={6}>
                  Purpose of Visit
                </Box>
              ),
              width: 150,
            },
            {
              accessor: "MadeofTransport",
              title: <Box mx={6}>Made of Transport</Box>,
              width: 120,
            },
            {
              accessor: "Amount",
              textAlign: "center",
              title: <Box mx={6}>Amount(Tk.)</Box>,
              width: 100,
            },
            {
              accessor: "actions",
              width: 70,
              textAlign: "center",
              title: <Box mx={6}>Action</Box>,
              render: (conveynance) => (
                <Group gap={4} justify="right" wrap="nowrap">
                  <ActionIcon size="sm" variant="subtle" color="blue">
                    <div className="text-center mx-auto">
                      <NavLink to={`/conveynance-edit/${conveynance._id}`}>
                        <FaEdit size={16} />
                      </NavLink>
                    </div>
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => conveynanceDelete(conveynance._id)}
                    size="sm"
                    variant="subtle"
                    color="red"
                  >
                    <NavLink>
                      <MdAutoDelete size={16} />
                    </NavLink>
                  </ActionIcon>
                </Group>
              ),
            },
          ]}
          totalRecords={conveynanceData?.length}
          records={records}
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

export default ConveynanceView;
