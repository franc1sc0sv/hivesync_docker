import { AxiosClient } from "../config/axios";
import { format_api_response, headers, throwError } from "../helpers/apiHelper";

const Prefix = "/auth";

export const api_login = async (credentials: any) => {
  try {
    const data = await AxiosClient.post(`${Prefix}/login`, credentials, headers());
    return format_api_response(data);
  } catch (e) {
    throwError(e);
  }
};

export const api_register = async (data: any) => {
  try {
    await AxiosClient.post(`${Prefix}/register`, data,headers());
    return true;
  } catch (e) {
    throwError(e);
  }
};

export const get_profile = async () => {
  try {
    const data = await AxiosClient.get(`${Prefix}/profile`, headers());

    return format_api_response(data);
  } catch (error) {
    throwError(error);
  }
};
