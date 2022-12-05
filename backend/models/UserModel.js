import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: [true, "Please enter user name"],
    },

    email: {
      type: String,
      required: [true, "Please enter email"],
    },

    password: {
      type: String,
      required: [true, "Please enter password"],
      select: false,
    },

    totalBooking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookingModel",
      },
    ],

    role: {
      type: String,
      default: "user",
    },

  },

  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model("UserModel", userSchema);

export default UserModel;
