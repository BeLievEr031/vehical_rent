import React, { useContext } from "react";
import Style from "./Cars.module.css";
import car from "../../assets/car1.jpg";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataProvider } from "../../context/DataProviderContext";
import axios from "axios";
function Cars({
  car,
  setBookingPop,
  setVehicalForBook,
  carsArr,
  setCarsArr,
  setPop,
  setDataForUpadte,
}) {
  // console.log(car);
  const { vehicalUrl } = useContext(DataProvider);
  const loggedUser = JSON.parse(window.localStorage.getItem("user"));
  const handleEditOpen = () => {
    setDataForUpadte(car);
    setPop(true);
  };

  const handleDeleteUIAndDB = async () => {
    const idx = carsArr.findIndex((currCar) => {
      return car._id === currCar._id;
    });

    carsArr.splice(idx, 1);
    setCarsArr([...carsArr]);
    try {
      let res = await axios({
        method: "delete",
        url: `${vehicalUrl}/delete/${car._id}`,
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
    setVehicalForBook({ ...car });
  };

  const handleDisplayNoCar = () => {
    return alert("No car is available to book");
  };

  return (
    <>
      <SkeletonTheme baseColor="#1f1b2c" highlightColor="#2d3748">
        <div className={Style.bike_cont}>
          <div className={Style.bike_img_cont}>
            <img src={car.imgUrl} alt="" />
          </div>

          <div className={Style.bike_details}>
            <h3>name:{car.model}</h3>
            <h3>Rent:{car.amount}$</h3>
            <h3>Unit:{car.unit}</h3>
          </div>

          {loggedUser.role === "admin" &&
          window.location.href.split("/")[3] === "admin" ? (
            <div className={Style.car_action}>
              <button className={Style.btn_edit} onClick={handleEditOpen}>
                {" "}
                {"edit"}
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
                  car.unit !== 0 ? handleBookingPopOpen : handleDisplayNoCar
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

export default Cars;
