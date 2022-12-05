import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { DataProviderContext } from "./context/DataProviderContext";
import Admin from "./components/Admin/Admin";
import Profile from "./components/Profile/Profile";
import Transcations from "./components/Transcations/Transcations";
import ProtectedRoute from "./components/Protected/Protected";
import ProtectedRouteAdmin from "./components/Protected/ProtectedAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserHistory from "./components/UserHistory/UserHistory";
import BookingStatus from "./components/AdminBookingStatus/BookingStatus";
function App() {
  return (
    <BrowserRouter>
      <DataProviderContext>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/history"
            element={
              <ProtectedRoute>
                <UserHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRouteAdmin>
                <Admin />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transcation"
            element={
              <ProtectedRouteAdmin>
                <Transcations />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/transcation/:userID"
            element={
              <ProtectedRouteAdmin>
                <Transcations />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/booking/status"
            element={
              <ProtectedRouteAdmin>
                <BookingStatus />
              </ProtectedRouteAdmin>
            }
          />
        </Routes>
        <ToastContainer />
      </DataProviderContext>
    </BrowserRouter>
  );
}

export default App;
