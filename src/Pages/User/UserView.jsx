import React, { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import { ActionIcon, Box, Group } from "@mantine/core";
import { FcAcceptDatabase } from "react-icons/fc";
import { MdAutoDelete } from "react-icons/md";
import { NavLink, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosPublic } from "../../Hook/useAxiosPublic";
const PAGE_SIZES = [15, 10, 20];
const UserView = () => {
  const [loader, setLoader] = useState(true);
  const userData = useLoaderData();
  const [data, setData] = useState(userData);
  console.log(data);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  useEffect(() => {
    setPage(1);
    setLoader(false);
  }, [pageSize]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(userData.slice(0, pageSize));
  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(userData.slice(from, to));
    setLoader(false);
  }, [page, pageSize]);

  const userEditHander = (id) => {
    const userData = {
      userPermission: "accepted",
    };
    axiosPublic.patch(`/users/${id}`, userData).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Congratulation!",
          text: "Your conveynance data edited successfully",
          icon: "success",
        });
        setLoader(false);
      }
    });
  };

  const userDataDel = (id) => {
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
        axiosPublic.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount == 1) {
            Swal.fire({
              title: "Congratulation",
              text: "Delete successfully",
              icon: "success",
            });
            setLoader(true);
            const remaining = data.find((con) => con._id === id);
            setData(remaining);
            setLoader(false);
          }
        });
      }
    });
  };
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
              width: 200,
            },
            {
              accessor: "userDesignation",
              textAlign: "center",
              title: <Box mx={6}>Designation</Box>,
              width: 110,
            },
            {
              accessor: "userDepartment",
              textAlign: "center",
              title: (
                <Box textAlign="center" mx={6}>
                  Department
                </Box>
              ),
              width: 100,
            },
            {
              accessor: "useCompanyName",
              textAlign: "center",
              title: <Box mx={6}>Company</Box>,
              width: 120,
            },
            {
              accessor: "userRole",
              textAlign: "center",
              title: <Box mx={6}>userRole</Box>,
              width: 90,
            },
            {
              accessor: "userPermission",
              textAlign: "center",
              title: <Box mx={6}>Permission</Box>,
              width: 120,
            },
            {
              accessor: "actions",
              width: 70,
              textAlign: "center",
              title: <Box mx={6}>Action</Box>,
              render: (user) => (
                <Group gap={4} justify="right" wrap="nowrap">
                  <ActionIcon
                    onClick={() => userEditHander(user._id)}
                    size="sm"
                    variant="subtle"
                    color="blue"
                  >
                    <div className="text-center mx-auto">
                      <FcAcceptDatabase size={16} />
                    </div>
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => userDataDel(user._id)}
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
          totalRecords={userData?.length}
          records={records ? data : []}
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

export default UserView;
