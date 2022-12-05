import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  vehical: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehicalModel",
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  date: {
    type: String,
  },
  from: {
    type: String,
  },
  to: {
    finalDate: {
      type: String,
    },
    time: {
      type: String,
    },
    meridiem: {
      type: String,
    },
    unavailable: {
      type: String,
    },
    newdata: {
      fromMillisec: {
        type: String,
      },
      toMillisec: {
        type: String,
      },
    },
  },
  hours: {
    type: String,
  },
  amount: {
    type: Number,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "successfull", "fail"],
    default: "pending",
  },
});

const BookingModel = new mongoose.model("BookingModel", bookingSchema);

export default BookingModel;
