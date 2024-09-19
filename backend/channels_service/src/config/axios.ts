import axios from "axios";

export const AxiosServerService = axios.create({
  baseURL: "http://hivesync_docker-server_service-1:3000/api/v1",
});

export const AxiosUserInfoService = axios.create({
  baseURL: "http://hivesync_docker-user_info_service-1:3000/api/v1",
});
