import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
const DataProvider = createContext();

function DataProviderContext({ children }) {
  const navigate = useNavigate();
  const userUrl = `http://localhost:5000/api/v1/user`;
  const vehicalUrl = `http://localhost:5000/api/v1/vehical`;
  const bookingUrl = `http://localhost:5000/api/v1/booking`;
  const [user, setUser] = useState();

  useEffect(() => {
    if (
      window.localStorage.getItem("user") &&
      window.localStorage.getItem("token")
    ) {
      let cuser = JSON.parse(window.localStorage.getItem("user"));
      setUser({ ...cuser });
      if (cuser.role === "admin") {
        let url = window.location.href.split("/");
        url[3] === "auth" ? navigate("/admin") : "";
      } else {
        let url = window.location.href.split("/");
        url[3] === "auth" ? navigate("/") : "";
      }
    } else {
      navigate("/auth");
    }
  }, []);

  return (
    <DataProvider.Provider value={{ user, userUrl, vehicalUrl, bookingUrl }}>
      {children}
    </DataProvider.Provider>
  );
}

export { DataProviderContext, DataProvider };
