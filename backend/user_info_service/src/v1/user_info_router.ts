import { Router } from "express";
import {
  FindUserByNameController,
  FindUserByNameControllerForFriends,
  GetFriendData,
  GetFriendsDataByUser,
  GetUserDataByID,
  post_user_info,
} from "../controllers/user_info/user_info_controller";

import {
  edit_username,
  edit_name,
  edit_about_me,
  edit_cover_color,
  reset_cover_color,
  edit_username_about_me
} from "../controllers/user_info/edit_user_info_controller";
import { auth_middleware } from "../middleware/auth";
const user_info_router = Router();

user_info_router
  .route("/friends")
  .post([auth_middleware, FindUserByNameControllerForFriends])
  .get([auth_middleware, GetFriendsDataByUser]);

user_info_router
  .route("/get_by_username")
  .post([auth_middleware, FindUserByNameController]);

user_info_router.route("/friends/:id").get([auth_middleware, GetFriendData]);

user_info_router.route("/").post(post_user_info);

user_info_router.route("/:id").get(GetUserDataByID);

//edit user data
user_info_router.route("/edit/username/:id").patch(auth_middleware, edit_username);
user_info_router.route("/edit/name/:id").patch(auth_middleware, edit_name);
user_info_router.route("/edit/about/:id").patch(auth_middleware, edit_about_me);
user_info_router.route("/edit/username-about/:id").patch(auth_middleware, edit_username_about_me);
user_info_router.route("/edit/cover/:id").patch(auth_middleware, edit_cover_color);
user_info_router.route("/edit/reset-cover-color/:id").patch(auth_middleware, reset_cover_color);

export default user_info_router;
