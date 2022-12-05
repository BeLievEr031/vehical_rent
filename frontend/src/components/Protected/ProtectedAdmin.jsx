import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function ProtectedRouteAdmin({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (!user || !token || user.role !== "admin") {
        console.log("ram sita");
      return navigate("/auth");
    }
  });

  return children;
}

export default ProtectedRouteAdmin;
