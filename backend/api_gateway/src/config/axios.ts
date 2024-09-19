import axios from "axios";

export const AxiosUserInfoService = axios.create({
  baseURL: "http://hivesync_docker-user_info_service-1:3000/api/v1",
});

export const AxiosChannelService = axios.create({
  baseURL: "http://hivesync_docker-channels_service-1:3000/api/v1",
});
