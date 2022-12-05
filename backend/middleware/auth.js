import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const auth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    // console.log(token);
    const { userID } = await jwt.verify(token, process.env.JWT_SECRET);
    if (!userID) {
      return res.json({
        success: true,
        msg: "Invalid token..",
      });
    }
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.json({
        success: true,
        msg: "Invalid token..",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

export default auth;
