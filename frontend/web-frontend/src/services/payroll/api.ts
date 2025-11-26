import axios from "axios";

const BASE_URL = "/api/payrolls";

export const getPayrolls = async () => (await axios.get(BASE_URL)).data;
export const createPayroll = async (data: any) => (await axios.post(BASE_URL, data)).data;
export const updatePayroll = async (id: number | string, data: any) => (await axios.put(`${BASE_URL}/${id}`, data)).data;
export const deletePayroll = async (id: number | string) => (await axios.delete(`${BASE_URL}/${id}`)).data;
