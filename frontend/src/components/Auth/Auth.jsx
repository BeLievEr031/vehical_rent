import React, { useContext } from "react";
import { useState } from "react";
import Style from "./Auth.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { DataProvider } from "../../context/DataProviderContext";
import { useNavigate } from "react-router-dom";
function Auth() {
  const navigate = useNavigate(); 
  const [auth, setAuth] = useState(false);
  const { userUrl } = useContext(DataProvider);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginRender = () => {
    setAuth(!auth);
  };

  const handleSetSignUpUser = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetLoginUser = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpUser = async () => {
    try {
      let res = await axios({
        method: "post",
        url: `${userUrl}/signup`,
        data: signUpData,
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
      setAuth(!auth);
      setSignUpData({
        name: "",
        email: "",
        password: "",
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

  const handleLoginUser = async () => {
    try {
      let res = await axios({
        method: "post",
        url: `${userUrl}/login`,
        data: loginData,
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

      // console.log(res);

      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setLoginData({
        email: "",
        password: "",
      });

      window.localStorage.setItem("user", JSON.stringify(res.user));
      window.localStorage.setItem("token", res.token);
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
    <div className={Style.container}>
      {auth ? (
        <div className={Style.auth}>
          <h1>Login</h1>
          <input
            onChange={(e) => {
              handleSetLoginUser(e);
            }}
            value={loginData.email}
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => {
              handleSetLoginUser(e);
            }}
            value={loginData.password}
            type="password"
            name="password"
            placeholder="Password"
          />

          <button onClick={handleLoginUser} className={Style.btn}>
            Login
          </button>
          <span onClick={handleLoginRender} className={Style.login}>
            Create An Account
          </span>
        </div>
      ) : (
        <div className={Style.auth}>
          <h1>SignUp</h1>
          <input
            onChange={(e) => {
              handleSetSignUpUser(e);
            }}
            value={signUpData.name}
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            onChange={(e) => {
              handleSetSignUpUser(e);
            }}
            value={signUpData.email}
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => {
              handleSetSignUpUser(e);
            }}
            value={signUpData.password}
            type="password"
            name="password"
            placeholder="Password"
          />

          <button onClick={handleSignUpUser} className={Style.btn}>
            SignUp
          </button>
          <span onClick={handleLoginRender} className={Style.login}>
            login
          </span>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Auth;
