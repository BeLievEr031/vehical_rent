import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (!user || !token) {
      return navigate("/auth");
    }
  });

  return children;
}

export default ProtectedRoute;
