import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  userDetail,
  getBookingDetails,
} from "../controller/userController.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
const userRouter = express.Router();

// route for signup user
userRouter.route("/signup").post(registerUser);
// route for login user
userRouter.route("/login").post(loginUser);
// route for update user
userRouter.route("/update").put(auth, updateUser);
// route for delete user
userRouter.route("/delete").delete(auth, deleteUser);
// route for get detail of user
userRouter.route("/detail").get(auth, isAdmin, userDetail);
// route for get all booking details of user
userRouter.route("/detail/booking").get(auth, getBookingDetails);

export default userRouter;
