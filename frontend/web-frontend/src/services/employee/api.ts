import axios from "axios";

const BASE_URL = "/api/employees";

export const getEmployees = async () => (await axios.get(BASE_URL)).data;
export const createEmployee = async (data: any) => (await axios.post(BASE_URL, data)).data;
export const updateEmployee = async (id: number | string, data: any) => (await axios.put(`${BASE_URL}/${id}`, data)).data;
export const deleteEmployee = async (id: number | string) => (await axios.delete(`${BASE_URL}/${id}`)).data;
