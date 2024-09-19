import { AxiosClient } from "../config/axios";
import { format_api_response, headers, throwError } from "../helpers/apiHelper";

export const get_all_notifications = async () => {
  try {
    const data = await AxiosClient.get(`/notifications/management/`, headers());
    return format_api_response(data);
  } catch (e) {
    throwError(e);
  }
};
