import ky from "../lib/ky";
import { useMutation } from "@tanstack/react-query";

const postFormData = async (data) => {
  return await ky.post("posts", { body: data });
};

export const usePostFormData = () => {
  return useMutation({
    mutationFn: postFormData,
  });
};
