import BookingModel from "../models/BookingModel.js";
import VehicalModel from "../models/VehicalModel.js";
import getTo from "../utils/getTo.js";

const bookVehical = async (req, res) => {
  try {
    const user = req.user;
    const { vehicalID } = req.params;
    if (!vehicalID) {
      return res.json({
        success: false,
        msg: "Invalid vehical",
      });
    }
    const { name, email, phone, date, from, hours, amount } = req.body;

    if (!name || !email || !phone || !date || !from || !hours || !amount) {
      return res.json({
        success: false,
        msg: "All fields required",
      });
    }

    let vehical = await VehicalModel.findById(vehicalID);

    if (vehical.unit === 0) {
      return res.json({
        success: false,
        msg: "No car is available..",
      });
    }

    //  Future car booking if required..
    // let isAlreadyBooked = await BookingModel.findOne({ vehical: vehicalID });
    // let isAnyVehicalAvailable = true;
    // if (isAlreadyBooked) {
    //   let newDate = date.split("/");
    //   console.log("saf");
    //   let year = newDate[2];
    //   let month = newDate[1];
    //   let dayDate = newDate[0];

    //   let hour = from.split(":")[0];
    //   let minute = from.split(":")[1].split(" ")[0];
    //   let meridiem = from.split(":")[1].split(" ")[1];

    //   if (meridiem == "pm") {
    //     hour = +hour + 12;
    //   }

    //   let newObjDate = new Date(+year, +month - 1, +dayDate, +hour, +minute, 0);

    //   for (let i = 0; i < isAlreadyBooked.lenght; i++) {
    //     let vehicalData = isAlreadyBooked[i];
    //     if (
    //       vehicalData.to.newdata.fromMillisec < newObjDate.getTime() &&
    //       newObjDate.getTime() <= vehicalData.to.newdata.toMillisec
    //     ) {
    //       isAnyVehicalAvailable = false;
    //     } else {
    //       isAnyVehicalAvailable = true;
    //       break;
    //     }
    //   }
    // }

    const to = getTo(date, from, hours);

    const bookingData = {
      user: user._id,
      vehical: vehicalID,
      name,
      email,
      phone,
      date,
      from,
      to,
      hours,
      amount,
    };

    // console.log(bookingData);

    let bookingVehical = await new BookingModel(bookingData);
    await bookingVehical.save();

    user.totalBooking.push(bookingVehical._id);
    await user.save();
    vehical.unit = +vehical.unit - 1;

    if (vehical.unit === 0) {
      vehical.isFree = false;
    }
    await vehical.save();

    res.json({
      success: true,
      msg: "Vehical booked successfully",
      bookingData,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const cancleVehical = async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);
    const booking = await BookingModel.find({ user: user._id });

    booking.forEach(async (booking) => {
      user.totalBooking.push(booking._id);
      let x = await BookingModel.findById(booking._id);
      x.status = "pending";
      await x.save();
    });
    await user.save();

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: true,
      msg: error.message,
    });
  }
};

const cancleBooking = async (req, res) => {
  try {
    let user = req.user;
    const { bookingID } = req.params;
    if (!bookingID) {
      return res.json({
        success: false,
        msg: "invalid booking",
      });
    }
    const booking = await BookingModel.findById(bookingID);
    // console.log(booking);
    const vehical = await VehicalModel.findById(booking.vehical);

    console.log(vehical);

    if (!booking) {
      return res.json({
        success: false,
        msg: "invalid booking",
      });
    }

    booking.status = "fail";
    await booking.save();

    vehical.unit = +vehical.unit + 1;
    await vehical.save();
    res.json({
      success: true,
      msg: "Booking cancled successfully....",
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const freeFromBooking = async (req, res) => {
  try {
    const { bookingID } = req.params;

    const bookingData = await BookingModel.findById(bookingID);

    console.log(bookingData);
    if (bookingData.isFree) {
      return res.json({
        success: false,
        msg: "Already free",
      });
    }

    const bookedVehical = await VehicalModel.findById(bookingData.vehical);

    console.log(bookedVehical);
    bookedVehical.unit = +bookedVehical.unit + 1;
    await bookedVehical.save();
    bookingData.status = "successfull";
    bookingData.isFree = true;
    await bookingData.save();
    res.json({
      success: true,
      msg: "Vehical free",
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const getAllBookingDetails = async (req, res) => {
  try {
    const bookings = await BookingModel.find({}).populate("vehical");

    // console.log(bookings);

    res.json({
      success: true,
      bookingData: bookings,
    });
  } catch (error) {
    return res.json({
      success: true,
      msg: error.message,
    });
  }
};

const getBookingDetailsOfSingleUser = async (req, res) => {
  try {
    const { userID } = req.params;

    // let x = userID;
    // console.log(typeof userID);
    if (!userID) {
      return res.json({
        success: false,
        msg: "Invalid user...",
      });
    }

    const bookings = await BookingModel.find({
      user: userID,
    });
    // console.log(bookings.length);
    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const getAllBookingDetailsForStatus = async (req, res) => {
  try {
    let bookingData = await BookingModel.find({}).populate("vehical");

    // console.log(bookingData);
    let newBookingDataForSend = [];

    for (let i = 0; i < bookingData.length; i++) {
      let booking = bookingData[i];
      let obj = {
        _id: booking._id,
        model: booking.vehical ? booking.vehical.model : "",
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
  bookVehical,
  cancleVehical,
  cancleBooking,
  freeFromBooking,
  getAllBookingDetails,
  getBookingDetailsOfSingleUser,
  getAllBookingDetailsForStatus,
};
