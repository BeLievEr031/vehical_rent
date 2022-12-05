import React from "react";
import Style from "./UserNavbar.module.css";
import Avatar from "react-avatar";
import logo from "../../assets/logo.png";

function UserNavbar({ setProfilePop, userAction, setUserAction }) {
  const loggedUser = JSON.parse(window.localStorage.getItem("user"));

  const handleProfilePopOpen = () => {
    setProfilePop(true);
  };

  return (
    <nav>
      <span className={Style.logo_cont}>
        <img src={logo} alt="logo" className={Style.logo} />
      </span>

      <div className={Style.action_cont}>
        <div
          className={Style.admin_action}
          onClick={() => {
            setUserAction("cars");
            window.localStorage.setItem("userAction", "cars");
          }}
          style={
            userAction === "cars" ? { color: "#8a2be2" } : { color: "white" }
          }
        >
          Cars
        </div>
        <div
          className={Style.admin_action}
          onClick={() => {
            setUserAction("bikes");
            window.localStorage.setItem("userAction", "bikes");
          }}
          style={
            userAction === "bikes" ? { color: "#8a2be2" } : { color: "white" }
          }
        >
          Bikes
        </div>

        <div className={Style.profile_cont}>
          <Avatar
            name="ankul"
            size="50"
            round={true}
            onClick={handleProfilePopOpen}
          />
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
