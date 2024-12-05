import ky from "@/lib/ky";

const BASE_URL = "https://development.mesplatform.com/config";

export const getMachines = async () => {
  const response = await ky.get(`${BASE_URL}/machines`).json();
  return response.data || [];
};

export const getProductionLines = async () => {
  const response = await ky.get(`${BASE_URL}/lines`).json();
  return response.data || [];
};

export const createMachine = async (data) => {
  const response = await ky.post(`${BASE_URL}/machine`, { json: data }).json();
  return response;
};

export const updateMachine = async (data) => {
  const response = await ky.put(`${BASE_URL}/machine`, { json: data }).json();
  return response;
};

export const deleteMachine = async (id) => {
  const response = await ky.delete(`${BASE_URL}/machine/${id}`).json();
  return response;
};
