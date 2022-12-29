import VehicalModel from "../models/VehicalModel.js";
import cloudinaryUpload from "../middleware/cloudinary.js";
import BookingModel from "../models/BookingModel.js";
import fs from "fs";
const addVehicalImage = async (req, res) => {
  try {
    const result = await cloudinaryUpload.uploader.upload(req.file.path);
    // console.log(result);

    if (!result) {
      return res.json({
        success: false,
        msg: "Internal server error..",
      });
    }

    const vehical = await new VehicalModel({
      imgUrl: result.secure_url,
    });
    await vehical.save();
    return res.json({
      success: true,
      vehical,
    });
  } catch (error) {
    return res.json({
      sucess: false,
      msg: error.message,
    });
  }
};

const addVehicalData = async (req, res) => {
  try {
    const user = req.user;
    const { vehicalID } = req.params;

    if (!vehicalID) {
      return res.json({
        success: false,
        msg: "Invalid vehical...",
      });
    }

    const { model, unit, amount, vehicalType } = req.body;

    if (!model || !unit || !amount || !vehicalType) {
      return res.json({
        success: false,
        msg: "All fields required..",
      });
    }

    const newVehical = await VehicalModel.findById(vehicalID);
    newVehical.model = model;
    newVehical.unit = unit;
    newVehical.amount = amount;
    newVehical.vehicalType = vehicalType;
    newVehical.user = user._id;
    await newVehical.save();

    res.json({
      success: true,
      msg: "vehical added",
      newVehical,
    });
  } catch (error) {
    return res.json({
      sucess: false,
      msg: error.message,
    });
  }
};

const deleteVehical = async (req, res) => {
  try {
    const { vehicalID } = req.params;

    if (!vehicalID) {
      return res.json({
        success: false,
        msg: "Invalid vehcal..",
      });
    }

    const vehicalForDelete = await VehicalModel.findById(vehicalID);
    await vehicalForDelete.delete();

    res.json({
      success: true,
      msg: "Vehical deleted successfully...",
    });
  } catch (error) {
    return res.json({
      sucess: false,
      msg: error.message,
    });
  }
};

const updateVehical = async (req, res) => {
  try {
    const { vehicalID } = req.params;

    if (!vehicalID) {
      return res.json({
        success: false,
        mag: "Invalid vehical",
      });
    }

    const vehicalForUpdate = await VehicalModel.findById(vehicalID);

    if (!vehicalForUpdate) {
      return res.json({
        success: false,
        mag: "Invalid vehical",
      });
    }

    const { model, amount, unit, vehicalType } = req.body;
    if (model) {
      vehicalForUpdate.model = model;
    }

    if (amount) {
      vehicalForUpdate.amount = amount;
    }
    if (unit) {
      const totalBooked = await BookingModel.find({
        vehical: vehicalID,
        isFree: false,
      });

      const newUnit = Math.abs(totalBooked.length - unit);
      vehicalForUpdate.unit = newUnit;
    }

    if (vehicalType) {
      vehicalForUpdate.vehicalType = vehicalType;
    }

    await vehicalForUpdate.save();

    res.json({
      success: true,
      msg: "Vehical updated..",
    });
  } catch (error) {
    return res.json({
      sucess: false,
      msg: error.message,
    });
  }
};

const getVehical = async (req, res) => {
  try {
  

    const vehical = await VehicalModel.find({});
    res.json({
      success: true,
      vehical,
    });
  } catch (error) {
    return res.json({
      sucess: false,
      msg: error.message,
    });
  }
};




export {
  addVehicalImage,
  addVehicalData,
  deleteVehical,
  getVehical,
  updateVehical,
};
