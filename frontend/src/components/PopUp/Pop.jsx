import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataProvider } from "../../context/DataProviderContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Style from "./Pop.module.css";
function Pop({
  setPop,
  carsArr,
  bikesArr,
  setBikesArr,
  setCarsArr,
  setDataForUpadte,
  dataForUpdate,
}) {
  const { vehicalUrl } = useContext(DataProvider);
  const [file, setFile] = useState(null);
  const [currCarData, setCurrCarData] = useState(
    dataForUpdate
      ? {
          model: dataForUpdate.model,
          amount: dataForUpdate.amount,
          unit: dataForUpdate.unit,
        }
      : {
          model: "",
          amount: "",
          unit: "",
        }
  );
  const [vehicalType, setVehicalType] = useState("");

  const handlePop = () => {
    setPop(false);
    setDataForUpadte(null);
  };

  const handleDataChange = (e) => {
    setCurrCarData({
      ...currCarData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveToDBAndUI = async () => {
    // console.log(currCarData.model.length);
    // console.log(file);

    try {
      const data = new FormData();
      data.append("file", file);

      if (
        file === null ||
        currCarData.model.length === 0 ||
        currCarData.amount.length === 0 ||
        currCarData.unit.length === 0 ||
        vehicalType.length === 0
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

      let resVehical = await axios({
        method: "post",
        url: `${vehicalUrl}/add`,
        data,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      resVehical = resVehical.data;
      const vehicalID = resVehical.vehical._id;
      // console.log("vehicalID", resVehical);
      if (!vehicalID) {
        return toast.error("Internal server error...", {
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

      // console.log(currCarData);

      let res = await axios({
        method: "post",
        url: `${vehicalUrl}/add/${vehicalID}`,
        data: { ...currCarData, ["vehicalType"]: vehicalType },
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      console.log(res.data);
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

      if (vehicalType.toLowerCase() === "car") {
        // console.log("cars added");

        setCarsArr([
          ...carsArr,
          {
            ...res.newVehical,
          },
        ]);
      } else {
        // console.log("bike added");
        setBikesArr([
          ...bikesArr,
          {
            ...res.newVehical,
          },
        ]);
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

  const handleUpdateDataToDBUI = async () => {
    console.log(dataForUpdate._id);
    if (dataForUpdate.vehicalType === "bike") {
      let idx = bikesArr.findIndex((bike) => {
        return dataForUpdate._id === bike._id;
      });

      console.log(idx);

      console.log(bikesArr[idx]);

      bikesArr[idx].model = currCarData.model;
      bikesArr[idx].amount = currCarData.amount;
      bikesArr[idx].unit = currCarData.unit;
      bikesArr[idx].vehicalType = vehicalType
        ? vehicalType
        : bikesArr[idx].vehicalType;

      if (vehicalType === "car") {
        setCarsArr([
          ...carsArr,
          {
            ...bikesArr[idx],
          },
        ]);
        bikesArr.splice(idx, 1);
      }
    } else {
      let idx = carsArr.findIndex((car) => {
        return dataForUpdate._id === car._id;
      });

      // console.log(idx);

      carsArr[idx].model = currCarData.model;
      carsArr[idx].amount = currCarData.amount;
      carsArr[idx].unit = currCarData.unit;
      carsArr[idx].vehicalType = vehicalType
        ? vehicalType
        : carsArr[idx].vehicalType;

      if (vehicalType === "bike") {
        setBikesArr([
          ...bikesArr,
          {
            ...carsArr[idx],
          },
        ]);
        carsArr.splice(idx, 1);
      }
    }

    try {
      let res = await axios({
        method: "put",
        url: `${vehicalUrl}/update/${dataForUpdate._id}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          ...currCarData,
          vehicalType,
        },
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
      <div className={Style.pop_overlay}>
        <div className={Style.pop_cont}>
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <input
            type="text"
            placeholder="Enter Car Name.."
            value={currCarData.model}
            onChange={(e) => handleDataChange(e)}
            name="model"
          />
          <input
            type="text"
            placeholder="Enter Rent Price.."
            value={currCarData.amount}
            onChange={(e) => handleDataChange(e)}
            name="amount"
          />
          <input
            type="text"
            placeholder="Enter Total Unit.."
            value={currCarData.unit}
            onChange={(e) => handleDataChange(e)}
            name="unit"
          />

          <select
            className={Style.pop_select}
            name=""
            id=""
            onChange={(e) => {
              setVehicalType(
                e.target.value === "vehicalType" ? "" : e.target.value
              );
            }}
          >
            <option value="vehicalType">select type</option>
            <option value="car">car</option>
            <option value="bike">bike</option>
          </select>

          <div className={Style.action_btn_cont}>
            <button onClick={handlePop}>cancle</button>
            <button
              onClick={
                dataForUpdate ? handleUpdateDataToDBUI : handleSaveToDBAndUI
              }
            >
              {dataForUpdate ? "update" : "save"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Pop;
