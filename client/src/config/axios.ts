/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BACKEND_BASE_URL } from "@/constants/API";

export const appApi = axios.create({
  baseURL: BACKEND_BASE_URL + "/api",
  withCredentials: true,
});

export default appApi;
