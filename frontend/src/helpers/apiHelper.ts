import { AxiosError, AxiosResponse } from "axios";
import { API_RESPONSE_ERROR } from "../types/api_response";
import { API_RESPONSE_ERROR_CLASS } from "../class/api_responses_instances";

export const throwError = (error: AxiosError | any) => {
  if (error instanceof AxiosError) {
    if (error.response?.data) {
      const err: API_RESPONSE_ERROR = error.response?.data;
      throw new API_RESPONSE_ERROR_CLASS({ ...err });
    }
  }
  throw new Error("Error desconocido");
};

export const format_api_response = (response: AxiosResponse) => {
  return response.data.DATA;
};

export const headers = () => {
  return {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
};

export const headersForm = () => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
};
