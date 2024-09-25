import React from "react";
import { axiosPublic } from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const useUserHook = () => {
  const {
    data: userData = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });
  return [userData, refetch, isFetching, isLoading];
};

export default useUserHook;
