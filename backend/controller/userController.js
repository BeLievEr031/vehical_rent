import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import VehicalModel from "../models/VehicalModel.js";
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({
        status: false,
        msg: "All fields required..",
      });
    }

    const isExists = await UserModel.findOne({ email });

    if (isExists) {
      return res.json({
        status: false,
        msg: "User already exists..",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const user = await new UserModel(userData);
    await user.save();

    res.json({
      success: true,
      msg: "User reegister successfully...",
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.json({
        status: false,
        msg: "All fields required..",
      });
    }

    const isUser = await UserModel.findOne({ email }).select("+password");

    if (!isUser) {
      return res.json({
        success: false,
        msg: "Invalid Credentiasls...",
      });
    }

    const isPasssword = await bcrypt.compare(password, isUser.password);

    if (!isPasssword) {
      return res.json({
        success: false,
        msg: "Invalid Credentiasls...",
      });
    }

    const token = await jwt.sign(
      { userID: isUser._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      msg: "User logged in..",
      user: isUser,
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.user;
    const { name } = req.body;

    if (name) {
      user.name = name;
      await user.save();
    }

    res.json({
      success: true,
      msg: "User updated..",
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const userDetail = async (req, res) => {
  try {
    const user = await UserModel.find({});
    res.json({
      success: true,
      msg: "all user fetched..",
      user,
    });

    // console.log(user);
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const getBookingDetails = async (req, res) => {
  try {
    const user = req.user;
    let bookingData = await UserModel.findById(user._id).populate(
      "totalBooking"
    );
    bookingData = bookingData.totalBooking;

    // console.log(bookingData);
    let newBookingDataForSend = [];

    for (let i = 0; i < bookingData.length; i++) {
      let booking = bookingData[i];
      let obj = {
        _id: booking._id,
        model: "",
        name: booking.name,
        email: booking.email,
        from: booking.date + " " + booking.from,
        to:
          booking.to.finalDate +
          " " +
          booking.to.time +
          " " +
          booking.to.meridiem,
        hours: booking.hours,
        amount: booking.amount,
        status: booking.status,
      };
      console.log(booking.vehical);
      const vehical = await VehicalModel.findById(booking.vehical);
      console.log(vehical);
      obj.model = vehical ? vehical.model : "";
      newBookingDataForSend.push({
        ...obj,
      });
    }

    res.json({
      success: true,
      bookingData: newBookingDataForSend,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  userDetail,
  getBookingDetails,
};
