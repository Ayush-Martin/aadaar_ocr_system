/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { IApiResponseError, IResponse } from "@/types/responseType";
import { BACKEND_BASE_URL } from "@/constants/API";
import { errorPopup } from "@/utils/popup";

export const appApi = axios.create({
  baseURL: BACKEND_BASE_URL + "/api",
  withCredentials: true,
});

export const axiosGetRequest = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<IResponse | void> => {
  try {
    const res = await appApi.get(url, config);
    return res.data;
  } catch (err) {
    const apiError = err as IApiResponseError;
    errorPopup(apiError.response.data.error || "Some error Occurred");
  }
};

export const axiosPostRequest = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig<any>
): Promise<IResponse | void> => {
  try {
    const res = await appApi.post(url, data, config);
    return res.data;
  } catch (err) {
    const apiError = err as IApiResponseError;
    errorPopup(apiError.response.data.error || "Some error Occurred");
  }
};

export const axiosPutRequest = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig<any>
): Promise<IResponse | void> => {
  try {
    const res = await appApi.put(url, data, config);
    return res.data;
  } catch (err) {
    const apiError = err as IApiResponseError;
    errorPopup(apiError.response.data.error || "Some error Occurred");
  }
};

export const axiosPatchRequest = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
): Promise<IResponse | void> => {
  try {
    const res = await appApi.patch(url, data, config);
    return res.data;
  } catch (err) {
    const apiError = err as IApiResponseError;
    errorPopup(apiError.response.data.error || "Some error Occurred");
  }
};

export const axiosDeleteRequest = async (
  url: string
): Promise<IResponse | void> => {
  try {
    const res = await appApi.delete(url);
    return res.data;
  } catch (err) {
    const apiError = err as IApiResponseError;
    errorPopup(apiError.response.data.error || "Some error Occurred");
  }
};

export default appApi;
