import { AxiosClient } from "../config/axios";
import { format_api_response, headers, throwError } from "../helpers/apiHelper";

export const get_call_data = async (id: string) => {
  try {
    const data = await AxiosClient.get(`/channels/calls/${id}`, headers());
    return format_api_response(data);
  } catch (e) {
    throwError(e);
  }
};

export const accept_call = async (id: string) => {
  try {
    const data = await AxiosClient.patch(
      `/channels/calls/accept/${id}`,
      headers()
    );
    return format_api_response(data);
  } catch (e) {
    throwError(e);
  }
};
