import express from "express";
import {
  bookVehical,
  cancleVehical,
  cancleBooking,
  freeFromBooking,
  getAllBookingDetails,
  getBookingDetailsOfSingleUser,
  getAllBookingDetailsForStatus,
} from "../controller/bookingController.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
const bookingRouter = express.Router();

bookingRouter.route("/book/:vehicalID").post(auth, bookVehical);
bookingRouter.route("/free/:bookingID").put(auth, isAdmin, freeFromBooking);

// route to cancel the vehical booking/trip
bookingRouter.route("/cancle/:bookingID").delete(auth, cancleBooking);

bookingRouter.route("/tp").post(auth, isAdmin, cancleVehical);

// admin route to get all booking details
bookingRouter.route("/details").get(auth, isAdmin, getAllBookingDetails);
bookingRouter
  .route("/details/status")
  .get(auth, isAdmin, getAllBookingDetailsForStatus);

// admin route to get booking details of single user
bookingRouter
  .route("/detail/:userID")
  .get(auth, isAdmin, getBookingDetailsOfSingleUser);

export default bookingRouter;
