import ky from "../lib/ky";
import { useMutation } from "@tanstack/react-query";

export const updateParts = async (data) => {
  const response = await ky.post("parts", { json: data });
  return response;
};

export const useUpdateParts = () => {
  return useMutation({
    mutationFn: updateParts,
  });
};
