import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { DataProvider } from "../../context/DataProviderContext";
import Style from "./TripHistoryCard.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function TripHistoryCard({
  user,
  trip,
  successfullTripArr,
  setSuccessfullTripArr,
  failedTripArr,
  setFailedTripArr,
  pendingTripArr,
  setPendingTripArr,
}) {
  console.log(trip);
  // console.log(window.location.href.split("/"));

  const { bookingUrl } = useContext(DataProvider);
  const [color, setColor] = useState(false);

  const handleCancleBooking = async () => {
    let isCancle = confirm("Do you want to cancle booking..?");
    if (!isCancle) {
      return;
    }

    try {
      const date = new Date();
      let tempdate = trip.from.split(" ");
      let fromDate = tempdate[0].split("/");
      let time = tempdate[1].split(":");
      let meridiem = tempdate[2];
      time[0] = meridiem === "pm" ? +time[0] + 12 : time[0];
      let cDate = new Date(
        fromDate[2],
        fromDate[1] - 1,
        fromDate[0],
        time[0],
        time[1],
        0
      );

      if (date.getTime() > cDate.getTime() && user.role === "user") {
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

      let idx = pendingTripArr.findIndex((pTrip) => {
        return trip._id === pTrip._id;
      });

      pendingTripArr[idx].status = "fail";

      setFailedTripArr([
        ...failedTripArr,
        {
          ...pendingTripArr[idx],
        },
      ]);
      pendingTripArr.splice(idx, 1);
      setPendingTripArr([...pendingTripArr]);

      let res = await axios({
        method: "delete",
        url: `${bookingUrl}/cancle/${trip._id}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      res = res.data;
      // console.log(res);

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

  const handleFreeCarUIAndDB = async () => {
    // console.log(trip);

    try {
      let res = await axios({
        method: "put",
        url: `${bookingUrl}/free/${trip._id}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      res = res.data;
      // console.log(res);

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

      let idx = pendingTripArr.findIndex((cTrip) => {
        return trip._id === cTrip._id;
      });

      console.log(idx);
      pendingTripArr[idx].status = "successfull";
      setSuccessfullTripArr([
        ...successfullTripArr,
        {
          ...pendingTripArr[idx],
        },
      ]);
      pendingTripArr.splice(idx, 1);
      setPendingTripArr([...pendingTripArr]);

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
  return (
    <>
      <div className={Style.trip_cont}>
        <h3
          style={
            color
              ? {
                  color: "red",
                }
              : {
                  color: "white",
                }
          }
        >
          _id:{trip._id}
        </h3>
        <h3>model:{trip.vahical ? trip.vehical.model : trip.model}</h3>
        <h3>name:{trip.name}</h3>
        <h3>Email:{trip.email}</h3>
        <h3>from: {trip.from}</h3>
        <h3>to: {trip.to}</h3>
        <h3>hours:{trip.hours}</h3>
        <h3>amount:{trip.amount}</h3>

        {trip.status === "pending" ? (
          <div className={Style.status_actio_btn_cont}>
            <button className={Style.cancle_btn} onClick={handleCancleBooking}>
              cancle
            </button>

            {user.role === "admin" &&
            window.location.href.split("/")[3] === "booking" &&
            window.location.href.split("/")[4] === "status" ? (
              <button
                className={Style.cancle_btn}
                onClick={handleFreeCarUIAndDB}
              >
                Free
              </button>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default TripHistoryCard;
