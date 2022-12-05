import React, { useState, useEffect, useContext } from "react";
import { DataProvider } from "../../context/DataProviderContext";
import Cars from "../Cars/Cars";
import UserNavbar from "../UserNavbar/UserNavbar";
import Style from "./Home.module.css";
import axios from "axios";
import Bikes from "../Bikes/Bikes";
import BookingPop from "../BookingPopUp/BookingPop";
import UserProfilePop from "../UserProfilePop/UserProfilePop";

function Home() {
  const [userAction, setUserAction] = useState(
    window.localStorage.getItem("userAction")
      ? window.localStorage.getItem("userAction")
      : "cars"
  );
  const [carsArr, setCarsArr] = useState([]);
  const [bikesArr, setBikesArr] = useState([]);
  const { vehicalUrl } = useContext(DataProvider);
  const [vehicalForBook, setVehicalForBook] = useState(null);
  const [bookingPop, setBookingPop] = useState(false);
  const [profilePop, setProfilePop] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios({
          method: "get",
          url: `${vehicalUrl}/get`,
          headers: {
            token: window.localStorage.getItem("token"),
          },
        });

        console.log(res.data);
        // console.log();
        const tempCarArr = res.data.vehical.filter((vehical) => {
          return vehical.vehicalType === "car";
        });

        const tempBikeArr = res.data.vehical.filter((vehical) => {
          return vehical.vehicalType === "bike";
        });
        // console.log(tempBikeArr);
        setCarsArr([...tempCarArr]);
        setBikesArr([...tempBikeArr]);
      } catch (error) {}
    }

    fetchData();
  }, []);

  return (
    <>
      <UserNavbar
        setProfilePop={setProfilePop}
        userAction={userAction}
        setUserAction={setUserAction}
      />
      <div className={Style.data_cont}>
        {(() => {
          if (userAction === "cars") {
            return carsArr.map((car, index) => {
              return (
                <Cars
                  setBookingPop={setBookingPop}
                  setVehicalForBook={setVehicalForBook}
                  car={car}
                  key={index}
                />
              );
            });
          } else if (userAction === "bikes") {
            return bikesArr.map((bike, index) => {
              return (
                <Bikes
                  setBookingPop={setBookingPop}
                  setVehicalForBook={setVehicalForBook}
                  bike={bike}
                  key={index}
                />
              );
            });
          }
        })()}
      </div>
      {bookingPop ? (
        <BookingPop
          carsArr={carsArr}
          setCarsArr={setCarsArr}
          bikesArr={bikesArr}
          setBikesArr={setBikesArr}
          vehicalForBook={vehicalForBook}
          setBookingPop={setBookingPop}
        />
      ) : (
        ""
      )}

      {profilePop ? <UserProfilePop setProfilePop={setProfilePop} /> : ""}
    </>
  );
}

export default Home;
