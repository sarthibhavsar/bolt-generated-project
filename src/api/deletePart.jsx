import ky from "../lib/ky";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useAlert } from '../components/index'

const deletePart = async (partId) => {
  console.log(partId);
  const response = await ky.delete(`part/${partId}`);
  return response.json();
};

export const useDeletePart = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  return useMutation({
    mutationFn: deletePart,
    onSuccess: () => {
      queryClient.invalidateQueries(["parts"]);
      showAlert("success", "", "Part Deleted Successfully");
    },
    onError: (err) => {
      showAlert("error", "", err.message || "Error !");
    },
  });
};
