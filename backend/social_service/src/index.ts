import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DefaultRouter from "./v1/DefaultRouter";
import FriendRequestRouter from "./v1/RequestRouter";
import FriendsRouter from "./v1/FriendsRouter";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
process.env.TZ = "America/El_Salvador";

const BASE_URL = "/api/v1";
const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.redirect(BASE_URL);
});

app.get(BASE_URL + "/", (_, res) => {
  res.redirect(BASE_URL);
});

app.use(BASE_URL, DefaultRouter);
app.use(BASE_URL + "/friends", FriendsRouter);
app.use(BASE_URL + "/request", FriendRequestRouter);

app.listen(PORT, () => {
  console.log(`SOCIAL microservice initialized in ${PORT}`);
});
