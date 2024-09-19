import { AxiosClient } from "../config/axios";
import { format_api_response, headers, throwError } from "../helpers/apiHelper";

//user information edit
export const edit_username = async (data: any) => {
  try {
    const res = await AxiosClient.patch("/edit/username", data, headers());
    return res;
  } catch (error) {
    console.log(error);
    throwError(error);
  }
};

export const edit_name = async (id: string, data: any) => {
  try {
    const res = await AxiosClient.patch(
      `/user_info/user/edit/name/${id}`,
      data,
      headers()
    );
    return res;
  } catch (error) {
    console.log(error);
    throwError(error);
  }
};

export const edit_about_me = async (id: string, data: any) => {
  try {
    const res = await AxiosClient.patch(
      `/user_info/user/edit/about/${id}`,
      data,
      headers()
    );
    return res;
  } catch (error) {
    console.log(error);
    throwError(error);
  }
};

export const edit_username_about = async (id: string, data: any) => {
  try {
    const res = await AxiosClient.patch(
      `/edit/username-about/${id}`,
      data,
      headers()
    );
    return res;
  } catch (error) {
    console.log(error);
    throwError(error);
  }
};

export const edit_cover_color = async (id: string, data: any) => {
  try {
    const res = await AxiosClient.patch(
      `/user_info/user/edit/cover/${id}`,
      data,
      headers()
    );
    return res;
  } catch (error) {
    console.log(error);
    throwError(error);
  }
};

export const reset_cover_color = async (id: string) => {
  try {
    const res = await AxiosClient.patch(
      `/user_info/user/edit/reset-cover-color/${id}`,
      headers()
    );
    return res;
  } catch (error) {
    console.log(error);
    throwError(error);
  }
};

export const get_user_username = async (data: any) => {
  try {
    const res = await AxiosClient.post(
      "/user_info/user/friends",
      data,
      headers()
    );
    return format_api_response(res);
  } catch (e) {
    throwError(e);
  }
};

export const get_friends_data = async () => {
  try {
    const res = await AxiosClient.get("/user_info/user/friends", headers());
    return format_api_response(res);
  } catch (e) {
    throwError(e);
  }
};

export const get_friend_data = async (id: string) => {
  try {
    const res = await AxiosClient.get(
      `/user_info/user/friends/${id}`,
      headers()
    );
    return format_api_response(res);
  } catch (e) {
    throwError(e);
  }
};

export const get_user_username_server = async (data: any) => {
  try {
    const res = await AxiosClient.post(
      "/user_info/user/get_by_username",
      data,
      headers()
    );
    return format_api_response(res);
  } catch (e) {
    throwError(e);
  }
};
