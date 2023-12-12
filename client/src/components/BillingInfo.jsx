import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookingInFor from "./BookingInFor";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import { Form, Dropdown, Input } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { createTicket } from "../actions";
import Booking from "../api/Booking";
import "./billingInfo.css";
import PaymentForm from "./paymentVnpay";
import axios from "axios";

const cardOptions = [
  { value: "Visa", text: "Visa" },
  { value: "American Express", text: "American Express" },
  { value: "Mastercard", text: "Mastercard" },
];

const renderSelectField = ({ input, label, placeholder }) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Dropdown
        selection
        value={input.value}
        onChange={(param, data) => input.onChange(data.value)}
        placeholder={placeholder}
        fluid
        options={cardOptions}
      />
    </Form.Field>
  );
};

const renderTextField = ({ input, placeholder, label, meta }) => {
  return (
    <Form.Field className={`${meta.touched && meta.invalid ? "error" : ""}`}>
      <label>{label}</label>
      <Input type="text" {...input} placeholder={placeholder} />
    </Form.Field>
  );
};
function BillingInfo(props) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");
  // console.log(selectedPaymentMethod);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };
  const navigate = useNavigate();

  const onSubmit = (formValues) => {
    // Đặt vé
    const { type } = props;
    if (type === "oneway") {
      const { passenger } = props;
      const { selectedFlight } = props;
      Booking.post("/booking/ticket", {
        buyerName: passenger.firstName + " " + passenger.lastName,
        buyerId: passenger.passengerId,
        phoneNumber: passenger.phone,
        email: passenger.email,
        address: passenger.address,
        dateOfBirth: passenger.birthDay,
        nationality: passenger.country,
        status: true,
        paymentMethod: selectedPaymentMethod,
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
          props.createTicket(res.data);
          navigate("/booking-success");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "roundtrip") {
      const { passenger } = props;
      const { selectedFlight, selectedReturnFlight } = props;
      Booking.post("/booking/ticket", {
        buyerName: passenger.firstName + " " + passenger.lastName,
        buyerId: passenger.passengerId,
        phoneNumber: passenger.phone,
        email: passenger.email,
        address: passenger.address,
        dateOfBirth: passenger.birthDay,
        nationality: passenger.country,
        status: true,
        verifyUser: false,
        paymentMethod: selectedPaymentMethod,
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
            flightId: selectedReturnFlight?._id,
            passenger: passenger?.firstName + " " + passenger?.lastName,
            passengerId: passenger?.passengerId,
            phoneNumber: passenger?.phone,
            type: selectedReturnFlight?.type,
            price: selectedReturnFlight?.totalPrice,
            seat: props.selectedReturnSeat[0]
              ? props.selectedReturnSeat[0]?.id
              : "",
            status: true,
          },
        ],
      })
        .then((res) => {
          props.createTicket(res.data);
          navigate("/booking-success");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const renderServices = () => {
    return (
      <div className="ui container grid" style={{ marginTop: 20 }}>
        <div className="eleven wide column leftService">
          <div className="field">
            <label className=" text-[20px] font-jambonoMedium mb-3">
              Phương thức thanh toán
            </label>
            <div>
              <label className="text-4 font-semibold">
                <input
                  type="radio"
                  className="mr-2"
                  value="creditCard"
                  checked={selectedPaymentMethod === "creditCard"}
                  onChange={() => handlePaymentMethodChange("creditCard")}
                />
                Thẻ tín dụng
              </label>
            </div>
            <div className="mb-4">
              <label className="text-4 font-semibold">
                <input
                  type="radio"
                  className="mr-2"
                  value="vnPay"
                  checked={selectedPaymentMethod === "vnPay"}
                  onChange={() => handlePaymentMethodChange("vnPay")}
                />
                VnPay
              </label>
            </div>
          </div>
          {selectedPaymentMethod === "creditCard" ? (
            <Form onSubmit={props.handleSubmit(onSubmit)}>
              <h4 className="ui dividing text-[20px] font-jambonoMedium mb-3">
                Thông tin thanh toán
              </h4>
              <div className="field">
                <label>Loại thẻ</label>
                <Field name="cardType" component={renderSelectField} />
              </div>
              <div className="fields">
                <div className="seven wide field">
                  <label>Số thẻ</label>
                  <input
                    required
                    type="text"
                    name="card[number]"
                    maxlength="16"
                    placeholder="Card #"
                  />
                </div>
                <div className="three wide field">
                  <label>CVC</label>
                  <input
                    required
                    type="text"
                    name="card[cvc]"
                    maxlength="3"
                    placeholder="CVC"
                  />
                </div>
                <div className="six wide field">
                  <label>Hạn thẻ</label>
                  <div className="two fields">
                    <div className="field">
                      <select
                        className="ui fluid search dropdown"
                        name="card[expire-month]"
                      >
                        <option value="">Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                    </div>
                    <div className="field">
                      <input
                        required
                        type="text"
                        name="card[expire-year]"
                        maxlength="4"
                        placeholder="Year"
                      />
                    </div>
                  </div>
                </div>
              </div>
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
          ) : (
            <PaymentForm selectedPaymentMethod={selectedPaymentMethod} />
          )}
        </div>
        <div className="five wide column rightService">
          <BookingInFor />
        </div>
      </div>
    );
  };

  // if(!props.startFrom)
  //   return <Redirect to="/" />
  if (!props.startFrom) {
    navigate("/");
    return null; // hoặc thêm các phần tử JSX khác bạn cần render ở đây
  }
  return (
    <div className="billingBackground">
      {/* <div className="ui container wrapper">
        <div className="search__info">
          {props.type === "oneway" && (
            <h3>CHUYẾN BAY MỘT CHIỀU | 1 Người lớn</h3>
          )}
          {props.type === "roundtrip" && (
            <h3>CHUYẾN BAY KHỨ HỒI | 1 Người lớn</h3>
          )}
          <div className="desciption">
            <p style={{ marginRight: 20 }}>
              <i
                style={{ marginRight: 10 }}
                className="fas fa-map-marker-alt"
              ></i>
              Điểm Khởi hành <span>{props.startFrom.name}</span>
            </p>
            <p>
              <i
                style={{ marginRight: 10 }}
                className="fas fa-map-marker-alt"
              ></i>
              Điểm đến <span>{props.destination.name}</span>
            </p>
          </div>
        </div>
        <div className="icons">
          <i
            style={{ color: "#fff", fontSize: "32px" }}
            className="fas fa-user-circle"
          ></i>
        </div>
      </div> */}
      <div className="veriabelTopMenu ">
        <div className="boxMenuTopSelect flex justify-between container">
          <div className="leftBoxMenuTop ">
            {props.type === "oneway" && (
              <div className="topLeftBoxMenu text-[18px] font-bold mb-[7px]">
                <span className="uppercase font-bold">
                  Chuyến bay một chiều |{" "}
                </span>
                <span>1 Người lớn</span>
              </div>
            )}
            {props.type === "roundtrip" && (
              <div className="topLeftBoxMenu text-[18px] font-bold mb-[7px]">
                <span className="uppercase font-bold">
                  Chuyến bay khứ hồi |{" "}
                </span>
                <span>1 Người lớn</span>
              </div>
            )}

            <div className="bottomLeftBoxMenu flex">
              <div className="flex mr-[34px] mb-[7px] items-center">
                <img
                  src="assets/departure-icon.25d3557e.svg"
                  alt="Departure Icon"
                />
                <h3 className="text-[18px] text-[#333333] ">
                  <span className="font-light ml-[5px] mr-2">
                    Điểm khởi hành
                  </span>
                  <span className="text-[#EC2029] font-bold">
                    {props.startFrom.name}
                  </span>
                </h3>
              </div>
              <div className="flex  mb-[7px] items-center">
                <img
                  className="w-[11px]"
                  src="assets/arrival-icon.a05c5d78.svg"
                  alt="Departure Icon"
                />
                <h3 className="text-[18px] text-[#333333] ">
                  <span className="font-light ml-[5px] mr-2">Điểm đến</span>
                  <span className="text-[#EC2029] font-bold">
                    {" "}
                    {props.destination.name}
                  </span>
                </h3>
              </div>
            </div>
          </div>
          <div className="rightBoxMenuTop flex items-center">
            <div class="jss4214 jss4215">
              <svg
                class="MuiSvgIcon-root active"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"></path>
              </svg>
            </div>
            <div class="jss4214">
              <svg
                class="MuiSvgIcon-root jss4216"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            </div>
            <div class="jss4214">
              <svg
                class="MuiSvgIcon-root jss4216"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
              </svg>
            </div>
            <div class="jss4214">
              <svg
                class="MuiSvgIcon-root jss4216"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {renderServices()}
    </div>
  );
}

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
})(BillingInfo);

export default connect(mapStateToProps, { createTicket })(BillingInfoForm);
