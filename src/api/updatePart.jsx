import ky from "../lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlert } from '../components/index'

export const updatePart = async (data) => {
  const response = await ky.put("part", { json: data });
  return response;
};

export const useUpdatePart = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: updatePart,
    onSuccess: () => {
      queryClient.invalidateQueries(["parts"]);
      showAlert("success", "", "Part Updated Successfully");
    },
    onError: (err) => {
      showAlert("error", "", err.message || "Error !");
    },
  });
};
