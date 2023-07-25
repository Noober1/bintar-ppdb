import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useEditMutation = <T extends {}>(url: string) => {
  return useMutation(async (data: T) => {
    const response = await axios.put(url, data);
    if (!response) {
      throw new Error("Error edit data");
    }
  });
};

const useAddMutation = <T extends {}>(url: string) => {
  return useMutation(async (data: T) => {
    const response = await axios.post(url, data);
    if (!response) {
      throw new Error("Error add data");
    }
  });
};

export { useAddMutation, useEditMutation };
