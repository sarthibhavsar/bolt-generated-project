import ky from "../lib/ky";
import { useQuery } from "@tanstack/react-query";

export const getParts = async () => {
  const response = await ky.get("parts").json();
  return response;
};

export const useParts = () => { 
  return useQuery({
    queryKey: ["parts"],
    queryFn: getParts,
  });
};
