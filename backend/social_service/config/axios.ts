import axios from "axios";

export const AxiosNotificationsService = axios.create({
  baseURL: "http://hivesync_docker-notifications_service-1:3000/api/v1",
});
