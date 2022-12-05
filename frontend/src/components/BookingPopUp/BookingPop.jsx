import React, { useContext, useState } from "react";
import Style from "./BookingPop.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { DataProvider } from "../../context/DataProviderContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bikes from "../Bikes/Bikes";
function BookingPop({
  carsArr,
  setCarsArr,
  bikesArr,
  setBikesArr,
  vehicalForBook,
  setBookingPop,
}) {
  const { bookingUrl } = useContext(DataProvider);
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });
  const [userAndRentHour, setUserAndRentHour] = useState({
    name: "",
    email: "",
    phone: "",
    hours: "",
  });
  const handleDateTimeChange = (e) => {
    setDateTime({
      ...dateTime,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {
    // return console.log(vehicalForBook);
    if (
      dateTime.date.length === 0 ||
      dateTime.time.length === 0 ||
      userAndRentHour.name.length === 0 ||
      userAndRentHour.email.length === 0 ||
      userAndRentHour.hours.length === 0 ||
      userAndRentHour.phone.length === 0
    ) {
      return toast.error("All fields required...", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    const newDate = dateTime.date.split("-").reverse().join("/");

    const meridiem = dateTime.time.split(":")[0] > 12 ? "pm" : "am";
    const newHour =
      +dateTime.time.split(":")[0] > 12
        ? +dateTime.time.split(":")[0] - 12
        : +dateTime.time.split(":")[0];
    const minute = +dateTime.time.split(":")[1];
    const newTime = `${newHour}:${minute} ${meridiem}`;
    const amount = +vehicalForBook.amount * +userAndRentHour.hours;

    const finalBookingData = {
      ...userAndRentHour,
      date: newDate,
      from: newTime,
      amount,
    };

    // console.log(finalBookingData);
    try {
      let res = await axios({
        method: "post",
        url: `${bookingUrl}/book/${vehicalForBook._id}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: finalBookingData,
      });
      res = res.data;
      console.log(res);

      if (!res.success) {
        return toast.error(res.msg, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      if (vehicalForBook.vehicalType === "car") {
        const idx = carsArr.findIndex((currCar) => {
          return currCar._id === vehicalForBook._id;
        });
        console.log("cars arr idx->", idx);

        carsArr[idx].unit = +carsArr[idx].unit - 1;
        setCarsArr([...carsArr]);
      } else {
        const idx = bikesArr.findIndex((currBike) => {
          return currBike._id === vehicalForBook._id;
        });

        console.log("bikes arr idx->", idx);
        bikesArr[idx].unit = +bikesArr[idx].unit - 1;
        setBikesArr([...bikesArr]);
      }
      setBookingPop(false);
      toast.success(res.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      return toast.error(error.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleBookingClosePop = () => {
    setBookingPop(false);
  };

  const handleToSetUserAndRentHour = (e) => {
    setUserAndRentHour({
      ...userAndRentHour,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className={Style.pop_overlay}>
        <div className={Style.pop_cont}>
          <input
            type="text"
            placeholder="Enter user Name.."
            name="name"
            onChange={(e) => {
              handleToSetUserAndRentHour(e);
            }}
          />
          <input
            type="email"
            placeholder="Enter email.."
            name="email"
            onChange={(e) => {
              handleToSetUserAndRentHour(e);
            }}
          />
          <input
            type="text"
            placeholder="Enter Number.."
            name="phone"
            onChange={(e) => {
              handleToSetUserAndRentHour(e);
            }}
          />
          <input
            type="text"
            placeholder="Enter Total hours.."
            name="hours"
            onChange={(e) => {
              handleToSetUserAndRentHour(e);
            }}
          />
          <input
            onChange={(e) => {
              handleDateTimeChange(e);
            }}
            type="date"
            name="date"
            id=""
            max="2023-01-01"
          />
          <input
            onChange={(e) => {
              handleDateTimeChange(e);
            }}
            name="time"
            type="time"
            id=""
          />

          <div className={Style.action_cont}>
            <button className={Style.book_btn} onClick={handleBookingClosePop}>
              cancle
            </button>
            <button className={Style.book_btn} onClick={handleBooking}>
              Book
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default BookingPop;
