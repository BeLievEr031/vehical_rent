import React, { useContext } from "react";
import Style from "./Bikes.module.css";
import bike from "../../assets/bike1.jpg";
import Pop from "../PopUp/Pop";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { DataProvider } from "../../context/DataProviderContext";
function Bikes({
  bike,
  setBikesArr,
  setVehicalForBook,
  bikesArr,
  setPop,
  setDataForUpadte,
  setBookingPop,
}) {
  // console.log(bike);
  const loggedUser = JSON.parse(window.localStorage.getItem("user"));

  const [edit, setEdit] = useState(false);
  const [updateEditData, setUpdateEditData] = useState({
    name: "",
    rent: "",
    unit: "",
  });
  const { vehicalUrl } = useContext(DataProvider);
  const handleEditOpen = () => {
    setDataForUpadte(bike);
    setPop(true);
  };

  const handleDeleteUIAndDB = async () => {
    const idx = bikesArr.findIndex((currBike) => {
      return bike._id === currBike._id;
    });

    bikesArr.splice(idx, 1);
    setBikesArr([...bikesArr]);
    try {
      let res = await axios({
        method: "delete",
        url: `${vehicalUrl}/delete/${bike._id}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      res = res.data;
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

  const handleBookingPopOpen = () => {
    setBookingPop(true);
    setVehicalForBook({ ...bike });
  };

  const handleDisplayNoCar = () => {
    return alert("No car is available to book");
  };
  return (
    <>
      <SkeletonTheme baseColor="#1f1b2c" highlightColor="#2d3748">
        <div className={Style.bike_cont}>
          <div className={Style.bike_img_cont}>
            <img src={bike.imgUrl} alt="" />
          </div>
          <div className={Style.bike_details}>
            <h3>name:{bike.model}</h3>
            <h3>Rent:{bike.amount}$</h3>
            <h3>Unit:{bike.unit}</h3>
          </div>

          {loggedUser.role === "admin" &&
          window.location.href.split("/")[3] === "admin" ? (
            <div className={Style.car_action}>
              <button className={Style.btn_edit} onClick={handleEditOpen}>
                edit
              </button>
              <button
                className={Style.btn_delete}
                onClick={handleDeleteUIAndDB}
              >
                {"delete"}
              </button>
            </div>
          ) : (
            <div className={Style.car_action}>
              <button
                className={Style.btn_book}
                onClick={
                  bike.unit !== 0 ? handleBookingPopOpen : handleDisplayNoCar
                }
              >
                {"Book"}
              </button>
            </div>
          )}
        </div>
      </SkeletonTheme>
      <ToastContainer />
    </>
  );
}

export default Bikes;
