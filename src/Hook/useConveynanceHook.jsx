import React from "react";
import { axiosPublic } from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const useConveynanceHook = () => {
  const {
    data: conveynanceData = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["conveynance"],
    queryFn: async () => {
      const res = await axiosPublic.get("/conveynances");
      return res.data;
    },
  });
  return [conveynanceData, refetch, isFetching];
};

export default useConveynanceHook;
