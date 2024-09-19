import { AxiosClient } from "../config/axios";
import { format_api_response, headers, throwError } from "../helpers/apiHelper";

const Prefix = "/reset_password";

export const requestPasswordReset = async (data: { email: string }) => {
    try {
        const response = await AxiosClient.post(`${Prefix}/request`, data, headers());
        return format_api_response(response);
    } catch (error) {
        throwError(error);
    }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const data = await AxiosClient.post(`${Prefix}/reset`, { token, newPassword }, headers());
    return format_api_response(data);
  } catch (e) {
    throwError(e);
  }
};