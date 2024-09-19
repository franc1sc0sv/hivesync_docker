import { AxiosClient } from "../config/axios";
import { format_api_response, headers, throwError } from "../helpers/apiHelper";

export const get_all_messages = async (id: string) => {
  try {
    const data = await AxiosClient.get(`/channels/messages/${id}`, headers());
    return format_api_response(data);
  } catch (e) {
    throwError(e);
  }
};

export const send_message = async (data: any) => {
  try {
    const res = await AxiosClient.post(`/channels/messages`, data, headers());
    return format_api_response(res);
  } catch (e) {
    throwError(e);
  }
};

export const create_channel = async (data: any, id: string) => {
  try {
    const res = await AxiosClient.post(
      `/channels/management/${id}`,
      data,
      headers()
    );
    return format_api_response(res);
  } catch (e) {
    throwError(e);
  }
};
