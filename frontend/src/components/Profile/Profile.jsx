import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import Style from "./Profile.module.css";
import { useEffect } from "react";
import { useContext } from "react";
import { DataProvider } from "../../context/DataProviderContext";
import { useState } from "react";
// import { DataProvider } from "../../context/DataProviderContext";
const user = JSON.parse(window.localStorage.getItem("user"));

function Profile() {
  const [totalBooking, setTotalBooking] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalCar, setTotalCar] = useState(0);
  const [totalBike, setTotalBike] = useState(0);
  const [totalTran, setTotalTra] = useState(0);
  const { bookingUrl, userUrl, vehicalUrl } = useContext(DataProvider);
  const [dataSet, setDataSet] = useState({
    pending: 0,
    successfull: 0,
    failed: 0,
  });

  const data = {
    labels: ["Pending", "Successfull", "Failed"],

    datasets: [
      {
        data: [dataSet.pending, dataSet.successfull, dataSet.failed],
        backgroundColor: ["grey", "lightgreen", "lightcoral"],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let res = await axios({
          method: "get",
          url: `${bookingUrl}/details`,
          headers: {
            token: window.localStorage.getItem("token"),
          },
        });

        res = res.data;
        console.log(res.bookingData);

        let totalAmount = 0;
        let succ = 0;
        let fail = 0;
        let pend = 0;
        for (let i = 0; i < res.bookingData.length; i++) {
          if (res.bookingData[i].isFree) {
            totalAmount += +res.bookingData[i].amount;
          }

          if (res.bookingData[i].status === "pending") {
            pend++;
          }
          if (res.bookingData[i].status === "successfull") {
            succ++;
          }
          if (res.bookingData[i].status === "fail") {
            fail++;
          }
        }

        setTotalTra(totalAmount);
        setTotalBooking(res.bookingData.length);
        setDataSet({
          pending: pend,
          successfull: succ,
          failed: fail,
        });
      } catch (error) {
        return console.log(error.message);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios({
          method: "get",
          url: `${userUrl}/detail`,
          headers: {
            token: window.localStorage.getItem("token"),
          },
        });
        // console.log(" user fetched...");

        // console.log(res.data);
        res = res.data;
        setTotalUser(res.user.length);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, []);

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

        const tempCarArr = res.data.vehical.filter((vehical) => {
          return vehical.vehicalType === "car";
        });

        const tempBikeArr = res.data.vehical.filter((vehical) => {
          return vehical.vehicalType === "bike";
        });
        let bikeSum = 0;
        for (let i = 0; i < tempBikeArr.length; i++) {
          bikeSum += tempBikeArr[i].unit;
        }

        let carSum = 0;
        for (let i = 0; i < tempCarArr.length; i++) {
          carSum += tempCarArr[i].unit;
        }
        setTotalBike(bikeSum);
        setTotalCar(carSum);
      } catch (error) {}
    }

    fetchData();
  }, []);

  return (
    <div className={Style.profile_container}>
      <div className={Style.user_info_container}>
        <h1>Name:{user.name}</h1>
        <h1>Email:{user.email}</h1>
      </div>

      <div className={Style.transcation_info_container}>
        <div className={Style.graph_cont}>
          <div
            style={{
              width: "450px",
              height: "450px",
            }}
          >
            <Pie data={data} />
          </div>
        </div>

        <div className={Style.user_booking_container}>
          <h1> Cars:{totalCar}</h1>
          <h1> Bikes:{totalBike}</h1>
          <h1> Users:{totalUser}</h1>
          <h1> Booking:{totalBooking}</h1>
          <h1> Transcations:{totalTran}</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
