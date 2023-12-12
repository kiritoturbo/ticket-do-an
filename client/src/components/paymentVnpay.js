import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { createTicket } from "../actions";
import Booking from "../api/Booking";
import { Form, Dropdown, Input } from "semantic-ui-react";
import axios from "axios";
const PaymentForm = (props) => {
  // console.log(props.selectedPaymentMethod);
  const navigate = useNavigate();
  const [bankCode, setBankCode] = useState(""); // Thêm trường bankCode
  const onSubmit = async (formValues) => {
    //   if (data.redirectUrl) {
    //     console.log(data.redirectUrl);
    //     // Redirect to the payment URL
    //     window.location.href = data.redirectUrl;
    //   } else {
    //     // Handle other response data as needed
    //     console.error("Unexpected response format:", data);
    //   }
    // Đặt vé
    const { type } = props;
    if (type === "oneway") {
      const { passenger } = props;
      const { selectedFlight } = props;
      //   Booking.post("/order/create_payment_url", {
      Booking.post("/order/create_payment_url", {
        buyerName: passenger.firstName + " " + passenger.lastName,
        buyerId: passenger.passengerId,
        phoneNumber: passenger.phone,
        email: passenger.email,
        address: passenger.address,
        dateOfBirth: passenger.birthDay,
        nationality: passenger.country,
        status: true,
        paymentMethod: props.selectedPaymentMethod,
        verifyUser: false,
        ticketInfos: [
          {
            flightId: selectedFlight._id,
            passenger: passenger.firstName + " " + passenger.lastName,
            passengerId: passenger.passengerId,
            phoneNumber: passenger.phone,
            type: selectedFlight.type,
            price: selectedFlight.totalPrice,
            seat: props.selectedSeat[0] ? props.selectedSeat[0].id : "",
            status: true,
          },
        ],
      })
        .then((res) => {
          //   console.log(res.data.vnpUrl);
          window.location.href = res.data.vnpUrl;
          props.createTicket(res.data.result);
          localStorage.setItem("paymentState", JSON.stringify(res.data.result));
          // navigate("/booking-success");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "roundtrip") {
      const { passenger } = props;
      const { selectedFlight, selectedReturnFlight } = props;
      //   Booking.post("/booking/ticket", {
      Booking.post("/order/create_payment_url", {
        buyerName: passenger.firstName + " " + passenger.lastName,
        buyerId: passenger.passengerId,
        phoneNumber: passenger.phone,
        email: passenger.email,
        address: passenger.address,
        dateOfBirth: passenger.birthDay,
        nationality: passenger.country,
        status: true,
        verifyUser: false,
        paymentMethod: props.selectedPaymentMethod,
        ticketInfos: [
          {
            flightId: selectedFlight._id,
            passenger: passenger.firstName + " " + passenger.lastName,
            passengerId: passenger.passengerId,
            phoneNumber: passenger.phone,
            type: selectedFlight.type,
            price: selectedFlight.totalPrice,
            seat: props.selectedSeat[0] ? props.selectedSeat[0].id : "",
            status: true,
          },
          {
            flightId: selectedReturnFlight._id,
            passenger: passenger.firstName + " " + passenger.lastName,
            passengerId: passenger.passengerId,
            phoneNumber: passenger.phone,
            type: selectedReturnFlight.type,
            price: selectedReturnFlight.totalPrice,
            seat: props.selectedReturnSeat[0]
              ? props.selectedReturnSeat[0].id
              : "",
            status: true,
          },
        ],
      })
        .then((res) => {
          window.location.href = res.data.vnpUrl;
          props.createTicket(res.data.result);
          localStorage.setItem("paymentState", JSON.stringify(res.data.result));
          //   navigate("/booking-success");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <Form onSubmit={props.handleSubmit(onSubmit)}>
        <h4 className="ui dividing text-[20px] font-jambonoMedium mb-3">
          Thông tin thanh toán
        </h4>

        <div
          className="div"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "35px",
          }}
        >
          <Link to="/select-service" className="ui button">
            Quay lại
          </Link>
          <button type="submit" className="ui button primary">
            Đặt vé
          </button>
        </div>
      </Form>
    </div>
  );
};
const selector = formValueSelector("passenger");
const selectorBooking = formValueSelector("FormBooking");
const mapStateToProps = (state) => {
  return {
    startFrom: selectorBooking(state, "startFrom"),
    destination: selectorBooking(state, "destination"),
    type: selectorBooking(state, "type"),
    flights: Object.values(state.flights),
    selectedFlight: state.selectedFlight,
    passenger: selector(
      state,
      "firstName",
      "lastName",
      "address",
      "email",
      "phone",
      "birthDay",
      "country",
      "passengerId"
    ),
    selectedSeat: Object.values(state.selectedSeat),

    selectedReturnFlight: state.selectedReturnFlight,
    selectedReturnSeat: Object.values(state.selectedReturnSeat),
  };
};

const BillingInfoForm = reduxForm({
  form: "billingInfoForm",
})(PaymentForm);

export default connect(mapStateToProps, { createTicket })(BillingInfoForm);
