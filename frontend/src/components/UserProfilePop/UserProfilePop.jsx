import React from "react";
import { useNavigate } from "react-router-dom";
import Style from "./UserProfilePop.module.css";
function UserProfilePop({ setProfilePop }) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleProfilePop = () => {
    setProfilePop(false);
  };

  const handlLogout = () => {
    window.localStorage.removeItem("userAction");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("tripAction");
    window.localStorage.removeItem("token");
    navigate("/auth");
  };
  return (
    <>
      <>
        <div className={Style.pop_overlay}>
          <div className={Style.pop_cont}>
            <h3>Name: {user.name}</h3>
            <h3>Email: {user.email}</h3>
            <div className={Style.action_btn_cont}>
              <button
                className={Style.action_btn}
                onClick={() => navigate("/user/history")}
              >
                Booking history
              </button>
              <button className={Style.action_btn} onClick={handleProfilePop}>
                cancle
              </button>
            </div>
            <span
              className={`material-symbols-rounded ${Style.logout}`}
              onClick={handlLogout}
            >
              logout
            </span>
          </div>
        </div>
      </>
    </>
  );
}

export default UserProfilePop;
