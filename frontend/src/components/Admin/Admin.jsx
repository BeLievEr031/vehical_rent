import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { DataProvider } from "../../context/DataProviderContext";
import Bikes from "../Bikes/Bikes";
import Cars from "../Cars/Cars";
import Navbar from "../Navbar/Navbar";
import Pop from "../PopUp/Pop";
import User from "../Users/Users";
import Style from "./Admin.module.css";
function Admin() {
  const [adminAction, setAdminAction] = useState(
    window.localStorage.getItem("adminAction")
      ? window.localStorage.getItem("adminAction")
      : "bikes"
  );
  const { vehicalUrl, userUrl } = useContext(DataProvider);
  const [carsArr, setCarsArr] = useState([]);
  const [bikesArr, setBikesArr] = useState([]);
  const [usersArr, setUsersArr] = useState([]);
  const [pop, setPop] = useState(false);
  const [dataForUpdate, setDataForUpadte] = useState();

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

        const tempCarArr = res.data.vehical.filter((vehical) => {
          return vehical.vehicalType === "car";
        });

        const tempBikeArr = res.data.vehical.filter((vehical) => {
          return vehical.vehicalType === "bike";
        });
        console.log(tempBikeArr);
        // console.log(tempCarArr);
        setCarsArr([...tempCarArr]);
        setBikesArr([...tempBikeArr]);
      } catch (error) {}
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("fetching user...");
        let res = await axios({
          method: "get",
          url: `${userUrl}/detail`,
          headers: {
            token: window.localStorage.getItem("token"),
          },
        });
        console.log(" user fetched...");

        console.log(res.data);
        res = res.data;
        setUsersArr([...res.user]);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Navbar
        adminAction={adminAction}
        setPop={setPop}
        setAdminAction={setAdminAction}
      />

      <div className={Style.data_cont}>
        {(() => {
          if (adminAction === "bikes") {
            return bikesArr.map((bike, i) => {
              return (
                <Bikes
                  bike={bike}
                  bikesArr={bikesArr}
                  setBikesArr={setBikesArr}
                  pop={pop}
                  setDataForUpadte={setDataForUpadte}
                  setPop={setPop}
                  key={i}
                />
              );
            });
          } else if (adminAction === "cars") {
            return carsArr.map((car, index) => {
              return (
                <Cars
                  car={car}
                  setCarsArr={setCarsArr}
                  carsArr={carsArr}
                  setDataForUpadte={setDataForUpadte}
                  setPop={setPop}
                  key={index}
                />
              );
            });
          } else {
            return usersArr.map((user, i) => {
              return <User user={user} key={i} />;
            });
          }
        })()}

        {pop ? (
          <Pop
            carsArr={carsArr}
            bikesArr={bikesArr}
            setPop={setPop}
            setBikesArr={setBikesArr}
            setCarsArr={setCarsArr}
            setDataForUpadte={setDataForUpadte}
            dataForUpdate={dataForUpdate}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Admin;
