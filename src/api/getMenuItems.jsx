import { useQuery } from "@tanstack/react-query";
import ky from "../lib/ky";

const fetchMenuItems = async (id) => {
  return await ky(`posts/${id}`).json();
};

export const getMenuItems = (id) => {
  return useQuery({
    queryKey: ['menuItems'],
    queryFn: () => fetchMenuItems(id),
    refetchOnWindowFocus: false,
  });
};
