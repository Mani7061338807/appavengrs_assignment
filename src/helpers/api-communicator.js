import axiosInstance from "../utils/axiosInstance";

export const getUser = async () => {
  const res = await axiosInstance.get("/auth/google", {
    withCredentials: true,
  });
  return res;
};

export const createSheet = async ({ spreadsheetId, worksheetName }) => {
  const res = await axiosInstance.post("/sheets/create", {
    spreadsheetId,
    worksheetName,
  });
  return res;
};
