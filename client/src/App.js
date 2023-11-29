import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import { Navigate, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Sử dụng Routes thay vì Route
import Home from "./components/pages/Home";
import history from "./history";
import SelectFlight from "./components/SelectFlight";
import Passengers from "./components/Passengers";
import SelectService from "./components/SelectService";
import BillingInfo from "./components/BillingInfo";
import BookingSuccess from "./components/BookingSuccess";
import SearchTicket from "./components/pages/SearchTicket";
import Footer from "./components/Footer";
import { connect } from "react-redux";
import { fetchAirports } from "./actions";
import HomeHotel from "./components/hotel/pages/home/Home";
import Hotel from "./components/hotel/pages/hotel/Hotel";
import ListHotel from "./components/hotel/pages/list/List";
import Map from "./components/car/screens/map";
import Signup from "./components/car/screens/signup";
import Login from "./components/car/screens/login";
import Cars from "./components/car/screens/cars";
import Bills from "./components/car/screens/bills";
import NavbarCar from "./components/car/components/navbar";
import SignupFlight from "./components/pages/signup";
import LoginFlight from "./components/pages/login";
import moment from "moment-timezone";
import VnpaySuccess from "./components/vnpaySuccess";

function App(props) {
  // Đặt múi giờ cho ứng dụng
  // moment.tz.setDefault("Asia/Ho_Chi_Minh");

  useEffect(() => {
    props.fetchAirports();
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <NavBar />
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="register" element={<SignupFlight />} />
                  <Route path="login" element={<LoginFlight />} />
                  <Route path="search-booking" element={<SearchTicket />} />
                  <Route path="select-flight" element={<SelectFlight />} />
                  <Route path="passengers" element={<Passengers />} />
                  <Route path="select-service" element={<SelectService />} />
                  <Route path="billing-info" element={<BillingInfo />} />
                  <Route path="booking-success" element={<BookingSuccess />} />
                  <Route path="ordervnpay-success" element={<VnpaySuccess />} />
                </Routes>
                <Footer />
              </>
            }
          />
          <Route path="select-hotel" element={<HomeHotel />} />
          <Route path="hotels" element={<ListHotel />} />
          <Route path="hotels/:id" element={<Hotel />} />
          <Route
            path="/car/*"
            element={
              <>
                <NavbarCar />
                <Routes>
                  <Route path="*" element={<StackContainer />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

const StackContainer = () => {
  let token = window.localStorage.getItem("token");
  let notToken = token === undefined;
  return (
    <Routes>
      <Route exact path="map-address" element={<Map />} />
      <Route
        path="register"
        element={notToken ? <Navigate to="/car/cabs" /> : <SignupFlight />}
      />
      <Route
        path="cabs"
        element={notToken ? <Navigate to="/car/register" /> : <Cars />}
      />
      <Route
        path="booking"
        element={notToken ? <Navigate to="/car/register" /> : <Bills />}
      />
      <Route
        path="login"
        element={notToken ? <Navigate to="/car/cabs" /> : <LoginFlight />}
      />
    </Routes>
  );
};

export default connect(null, { fetchAirports })(App);
