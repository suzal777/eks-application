import axios from "axios";

const BASE_URL = "/api/departments";

export const getDepartments = async () => (await axios.get(BASE_URL)).data;
export const createDepartment = async (data: any) => (await axios.post(BASE_URL, data)).data;
export const updateDepartment = async (id: number | string, data: any) => (await axios.put(`${BASE_URL}/${id}`, data)).data;
export const deleteDepartment = async (id: number | string) => (await axios.delete(`${BASE_URL}/${id}`)).data;
