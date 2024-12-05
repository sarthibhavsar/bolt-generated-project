import ky from "../lib/ky";
import { useMutation } from "@tanstack/react-query";

export const addPart = async (data) => {
  const response = await ky.post("parts", { json: data });
  return response;
};

export const useAddPart = () => {
  return useMutation({
    mutationFn: addPart,
  });
};
