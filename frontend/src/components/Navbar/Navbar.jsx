import React from "react";
import Style from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Navbar({ setPop, adminAction, setAdminAction }) {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(window.localStorage.getItem("user"));

  const handleRedirectToProfile = () => {
    navigate("/profile");
  };

  const handleBikes = () => {
    setAdminAction("bikes");
    window.localStorage.setItem("adminAction", "bikes");
  };
  const handleCars = () => {
    setAdminAction("cars");
    window.localStorage.setItem("adminAction", "cars");
  };
  const handleUsers = () => {
    setAdminAction("users");
    window.localStorage.setItem("adminAction", "users");
  };

  const handlePop = () => {
    setPop(true);
  };

  const handleBookingStatusNavigate = () => {
    navigate("/booking/status");
  };
  return (
    <nav>
      <span className={Style.logo_cont}>
        <img src={logo} alt="logo" className={Style.logo} />
      </span>

      <div className={Style.action_cont}>
        <div
          className={Style.admin_action}
          onClick={handleBikes}
          style={
            adminAction === "bikes" ? { color: "#8a2be2" } : { color: "white" }
          }
        >
          Bikes
        </div>
        <div
          className={Style.admin_action}
          onClick={handleCars}
          style={
            adminAction === "cars" ? { color: "#8a2be2" } : { color: "white" }
          }
        >
          Cars
        </div>
        <div
          className={Style.admin_action}
          onClick={handleUsers}
          style={
            adminAction === "users" ? { color: "#8a2be2" } : { color: "white" }
          }
        >
          Users
        </div>

        <div className={Style.add_btn_cont}>
          <span
            className={`material-symbols-rounded ${Style.add_btn}`}
            onClick={handlePop}
          >
            add
          </span>
        </div>
        <div className={Style.add_btn_cont}>
          <span
            className="material-symbols-rounded"
            onClick={handleBookingStatusNavigate}
          >
            directions_car
          </span>
        </div>
        <div className={Style.add_btn_cont}>
          <span
            className={`material-symbols-rounded`}
            onClick={() => {
              navigate("/transcation");
            }}
          >
            payments
          </span>
        </div>

        <div className={Style.profile_cont} onClick={handleRedirectToProfile}>
          <Avatar name={JSON.parse(window.localStorage.getItem("user")).name} size="50" round={true} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
