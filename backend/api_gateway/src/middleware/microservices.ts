import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import RequestWithUser from "../interfaces/auth_interface";

export const FriendsProxyMiddeware = createProxyMiddleware({
  target: "http://hivesync_docker-social_service-1:3000/api/v1",
  changeOrigin: true,
  pathRewrite: { "^/social": "" },
  on: {
    proxyReq: (proxyReq, req: RequestWithUser) => {
      proxyReq.setHeader("user", JSON.stringify(req.user));
      fixRequestBody(proxyReq, req);
    },
  },
});

export const UserInfoProxyMiddleware = createProxyMiddleware({
  target: "http://hivesync_docker-user_info_service-1:3000/api/v1",
  changeOrigin: true,
  pathRewrite: { "^/user_info": "" },
  on: {
    proxyReq: (proxyReq, req: RequestWithUser) => {
      proxyReq.setHeader("user", JSON.stringify(req.user));
      fixRequestBody(proxyReq, req);
    },
  },
});

export const ServersProxyMiddleware = createProxyMiddleware({
  target: "http://hivesync_docker-server_service-1:3000/api/v1",
  changeOrigin: true,
  pathRewrite: { "^/sever": "" },
  on: {
    proxyReq: (proxyReq, req: RequestWithUser) => {
      proxyReq.setHeader("user", JSON.stringify(req.user));
      fixRequestBody(proxyReq, req);
    },
  },
});

export const ChannelsProxyMiddleware = createProxyMiddleware({
  target: "http://hivesync_docker-channels_service-1:3000/api/v1",
  changeOrigin: true,
  pathRewrite: { "^/channels": "" },
  on: {
    proxyReq: (proxyReq, req: RequestWithUser) => {
      proxyReq.setHeader("user", JSON.stringify(req.user));
      fixRequestBody(proxyReq, req);
    },
  },
  logger: console,
});

export const NotificationsProxyMiddleware = createProxyMiddleware({
  target: "http://hivesync_docker-notifications_service-1:3000/api/v1",
  changeOrigin: true,
  pathRewrite: { "^/notifications": "" },
  on: {
    proxyReq: (proxyReq, req: RequestWithUser) => {
      proxyReq.setHeader("user", JSON.stringify(req.user));
      fixRequestBody(proxyReq, req);
    },
  },
});
