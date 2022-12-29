import express from "express";
import {
  addVehicalImage,
  addVehicalData,
  deleteVehical,
  getVehical,
  updateVehical,
} from "../controller/vehicalController.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import upload from "../utils/upload.js";
const vehicalRouter = express.Router();


// route for adding vehical
vehicalRouter
  .route("/add")
  .post(auth, isAdmin, upload.single("file"), addVehicalImage);
vehicalRouter.route("/add/:vehicalID").post(auth, isAdmin, addVehicalData);

// route for upating vehical
vehicalRouter.route("/update/:vehicalID").put(auth, isAdmin, updateVehical);

// route for delete vehical
vehicalRouter.route("/delete/:vehicalID").delete(auth, isAdmin, deleteVehical);

// route for getting vehical
vehicalRouter.route("/get").get(auth, getVehical);

export default vehicalRouter;
