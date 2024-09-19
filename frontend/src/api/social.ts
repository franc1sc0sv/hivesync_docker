import { AxiosClient } from "../config/axios";
import { format_api_response, headers, throwError } from "../helpers/apiHelper";

export const get_friends_by_user = async () => {
  try {
    const res = await AxiosClient.get("/social/friends", headers());
    return format_api_response(res);
  } catch (e) {
    throwError(e);
  }
};

export const create_friend_request = async (data: any) => {
  try {
    const res = await AxiosClient.post("/social/request", data, headers());
    return format_api_response(res);
  } catch (e) {
    throwError(e);
  }
};

export const reject_friend_request = async (data: any) => {
  try {
    const res = await AxiosClient.post(
      "/social/request/reject",
      data,
      headers()
    );
    return format_api_response(res);
  } catch (e) {
    throwError(e);
  }
};

export const accept_friend_request = async (data: any) => {
  try {
    const res = await AxiosClient.post(
      "/social/request/accept",
      data,
      headers()
    );
    return format_api_response(res);
  } catch (e) {
    throwError(e);
  }
};

export const delete_friend_request = async () => {
  try {
    const res = await AxiosClient.delete("/social/request/", headers());
    return format_api_response(res);
  } catch (e) {
    throwError(e);
  }
};
