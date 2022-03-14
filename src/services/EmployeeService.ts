import axios from "axios";
//import { title } from "process";
import Employee from "../interfaces/Employee";
const apiClient = axios.create({
  baseURL: "http://dummy.restapiexample.com/api/v1/",
  headers: { "Content-type": "application/json" },

  //   baseURL: "",
  withCredentials: false,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //   },
});

const findAll = async () => {
  const response = await apiClient.get<Employee[]>("/employees");
  return response.data;
};

const findById = async (id: any) => {
  const response = await apiClient.get<Employee>(`/employee/${id}`);
  return response.data;
};

const create = async ({ name, salary, age }: Employee) => {
  const response = await apiClient.post<any>("/create", {
    name,
    salary,
    age,
  });
  return response.data;
};

const update = async (id: any, { name, salary, age }: Employee) => {
  const response = await apiClient.put<any>(`/update/$id`, {
    name,
    salary,
    age,
  });
  return response.data;
};

const deleteById = async (id: any) => {
  const response = await apiClient.delete<any>(`/delete/$id`);
  return response.data;
};

const AxiosEmployeeServices = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};

export default AxiosEmployeeServices;
