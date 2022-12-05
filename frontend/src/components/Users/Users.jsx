import React from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Users.module.css";

function User({ user }) {
  const loggedUser = JSON.parse(window.localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleUserExpense = () => {
    navigate(`/transcation/${user._id}`);
  };

  const handleDeleteUser = () => {};
  return (
    <>
      <div className={Style.user_cont} style={{}}>
        <h3>Name:{user.name}</h3>
        <h3>Email:{user.email}</h3>
        <h3>Total Booking:{user.totalBooking.length}</h3>
        <div className={Style.action_btn_cont}>
          <span
            className={`material-symbols-rounded`}
            onClick={handleUserExpense}
          >
            payments
          </span>
          {loggedUser._id === user._id ? (
            <span
              style={{
                color: "lightgreen",
              }}
              className="material-symbols-rounded"
            >
              admin_panel_settings
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default User;
