import axios from "axios";

export const AxiosSocialService = axios.create({
  baseURL: "http://hivesync_docker-social_service-1:3000/api/v1",
});
