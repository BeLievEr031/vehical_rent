import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import TripHistoryCard from "../TripHistoryCard/TripHistoryCard";
import { DataProvider } from "../../context/DataProviderContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Style from "./UserHistory.module.css";
function UserHistory() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const { userUrl, bookingUrl } = useContext(DataProvider);
  const [pendingTripArr, setPendingTripArr] = useState([]);
  const [successfullTripArr, setSuccessfullTripArr] = useState([]);
  const [failedTripArr, setFailedTripArr] = useState([]);
  const [tripAction, setTripAction] = useState(
    window.localStorage.getItem("tripAction")
      ? window.localStorage.getItem("tripAction")
      : "pending"
  );

  useEffect(() => {
    async function fetchData() {
      try {
        let res;

        if (
          user.role === "admin" &&
          window.location.href.split("/")[3] === "booking" &&
          window.location.href.split("/")[4] === "status"
        ) {
          res = await axios({
            method: "get",
            url: `${bookingUrl}/details/status`,
            headers: {
              token: window.localStorage.getItem("token"),
            },
          });
          res = res.data;
        } else {
          res = await axios({
            method: "get",
            url: `${userUrl}/detail/booking`,
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
        }

        let tempPendingArr = [];
        let tempSuccessArr = [];
        let tempFailArr = [];
        for (let i = 0; i < res.bookingData.length; i++) {
          let booking = res.bookingData[i];

          if (booking.status.toLowerCase() === "pending") {
            tempPendingArr.push(booking);
          } else if (booking.status.toLowerCase() === "successfull") {
            tempSuccessArr.push(booking);
          } else {
            tempFailArr.push(booking);
          }
        }

        // console.log(tempPendingArr);
        // console.log(tempSuccessArr);
        // console.log(tempFailArr);

        setPendingTripArr([...tempPendingArr]);
        setSuccessfullTripArr([...tempSuccessArr]);
        setFailedTripArr([...tempFailArr]);

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
    }

    fetchData();
  }, []);

  return (
    <>
      <nav className={Style.status_nav}>
        <span
          style={
            tripAction.toLocaleLowerCase() === "pending"
              ? { color: "#8a2be2" }
              : { color: "white" }
          }
          onClick={() => {
            window.localStorage.setItem("tripAction", "Pending");
            setTripAction("Pending");
          }}
        >
          Pending
        </span>
        <span
          style={
            tripAction.toLocaleLowerCase() === "successfull"
              ? { color: "#8a2be2" }
              : { color: "white" }
          }
          onClick={() => {
            window.localStorage.setItem("tripAction", "Successfull");
            setTripAction("Successfull");
          }}
        >
          Successfull
        </span>
        <span
          style={
            tripAction.toLocaleLowerCase() === "failed"
              ? { color: "#8a2be2" }
              : { color: "white" }
          }
          onClick={() => {
            window.localStorage.setItem("tripAction", "Failed");
            setTripAction("Failed");
          }}
        >
          Failed
        </span>

        {user.role === "admin" ? (
          <div className={Style.status_search_action}>
            <input type="text" />
            <button>Search</button>
          </div>
        ) : (
          ""
        )}
      </nav>

      <div className={Style.trip_data_cont}>
        {(() => {
          if (tripAction.toLowerCase() === "pending") {
            if (pendingTripArr.length === 0) {
              return <h1>No Upcoming trip found</h1>;
            }

            return pendingTripArr.map((trip, index) => {
              return (
                <TripHistoryCard
                  user={user}
                  successfullTripArr={successfullTripArr}
                  setSuccessfullTripArr={setSuccessfullTripArr}
                  failedTripArr={failedTripArr}
                  setFailedTripArr={setFailedTripArr}
                  pendingTripArr={pendingTripArr}
                  setPendingTripArr={setPendingTripArr}
                  trip={trip}
                  key={index}
                />
              );
            });
          } else if (tripAction.toLowerCase() === "successfull") {
            if (successfullTripArr.length === 0) {
              return <h1>No trip found</h1>;
            }
            return successfullTripArr.map((trip, index) => {
              return <TripHistoryCard user={user} trip={trip} key={index} />;
            });
          } else {
            if (failedTripArr.length === 0) {
              return <h1>No trip found</h1>;
            }
            return failedTripArr.map((trip, index) => {
              return <TripHistoryCard user={user} trip={trip} key={index} />;
            });
          }
        })()}
      </div>
    </>
  );
}

export default UserHistory;
