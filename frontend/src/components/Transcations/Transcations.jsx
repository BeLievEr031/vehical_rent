import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataProvider } from "../../context/DataProviderContext";
import Bill from "../TranscationBill/Bill";
import Style from "./Transcations.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Transcations() {
  const { userID } = useParams();
  console.log(userID);
  const { bookingUrl } = useContext(DataProvider);
  const [transcations, setTranscations] = useState([]);
  const [filterTranscation, setFilterTranscations] = useState([]);
  const [filterData, setFilterData] = useState({
    year: "",
    month: "",
  });
  const monthsArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        if (userID) {
          let res = await axios({
            method: "get",
            url: `${bookingUrl}/detail/${userID}`,
            headers: {
              token: window.localStorage.getItem("token"),
            },
          });
          console.log(res.data);
          res = res.data;
          setTranscations([...res.bookings]);
          setFilterTranscations([...res.bookings]);
        } else {
          let res = await axios({
            method: "get",
            url: `${bookingUrl}/details`,
            headers: {
              token: window.localStorage.getItem("token"),
            },
          });
          console.log(res.data);
          res = res.data;

          if (!res.success) {
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
          setTranscations([...res.bookingData]);
          setFilterTranscations([...res.bookingData]);

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
        }
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

  const handleChangeData = (e) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value === "All" ? "" : e.target.value,
    });
  };

  const handleSearching = () => {
    if (filterData.month === "" && filterData.year !== "") {
      let filter = transcations.filter((bill) => {
        return filterData.year === bill.date.split("/")[2];
      });
      setFilterTranscations([...filter]);
    } else if (filterData.month !== "" && filterData.year === "") {
      let filter = transcations.filter((bill) => {
        return (
          filterData.month.toLowerCase() ===
          monthsArr[+bill.date.split("/")[1] - 1].toLowerCase()
        );
      });

      setFilterTranscations([...filter]);
    } else if (filterData.month === "" && filterData.year === "") {
      setFilterTranscations([...transcations]);
    } else {
      let filter = transcations.filter((bill) => {
        return (
          filterData.year === bill.date.split("/")[2] &&
          filterData.month.toLowerCase() ===
            monthsArr[+bill.date.split("/")[1] - 1].toLowerCase()
        );
      });
      setFilterTranscations([...filter]);
    }
  };

  return (
    <>
      <div className={Style.filter_cont}>
        <div className={Style.years}>
          <select
            name="year"
            id=""
            className={Style.select_year}
            onChange={(e) => handleChangeData(e)}
          >
            <option value="All">All</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={Style.months}>
          <select
            name="month"
            id=""
            className={Style.select_month}
            onChange={(e) => handleChangeData(e)}
          >
            <option value="All">All</option>

            {monthsArr.map((month, index) => {
              return (
                <option value={month} key={index}>
                  {month}
                </option>
              );
            })}
          </select>
        </div>

        <button className={Style.search_btn} onClick={handleSearching}>
          search
        </button>
      </div>

      {filterTranscation.length !== 0 ? (
        <div className={Style.bill_cont}>
          {filterTranscation.map((bill, index) => {
            return <Bill bill={bill} key={index} />;
          })}
        </div>
      ) : (
        <h1>No transcation found...</h1>
      )}
    </>
  );
}

export default Transcations;
