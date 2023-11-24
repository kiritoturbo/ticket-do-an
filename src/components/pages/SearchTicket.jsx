import React, { useState, lazy, Suspense } from "react";
import "./searchTicket.css";

import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import searchBooking from "../../api/searchBooking";
import SearchImg from "../../public/images/searchBooking.jpg";

const renderTextField = ({ input, label, meta }) => {
  return (
    <TextField
      {...input}
      label={label}
      error={meta.touched && meta.invalid}
      id="outlined-size-small"
      defaultValue="Small"
      variant="outlined"
      size="small"
      style={{ width: "100%", marginBottom: "20px", backgroundColor: "#fff" }}
    />
  );
};

function SearchTicket(props) {
  const [booking, setBooking] = useState(null);
  const onSubmit = (formValues) => {
    searchBooking
      .get(
        `booking/pnr/${formValues.pnr}?fullname=${
          formValues.firstName + " " + formValues.lastName
        }`
      )
      .then((res) => {
        console.log(res);
        const data = res.data[0];
        const takeOffTime = new Date(data.tickets[0].flightId.takeOffTime);
        const landingTime = new Date(data.tickets[0].flightId.landingTime);
        data.tickets[0].flightId.takeOffTime = takeOffTime.toLocaleString();
        data.tickets[0].flightId.landingTime = landingTime.toLocaleString();
        if (data.tickets[1]) {
          data.tickets[1].flightId.takeOffTime = takeOffTime.toLocaleString();
          data.tickets[1].flightId.landingTime = landingTime.toLocaleString();
        }

        setBooking(data);
      })
      .catch((error) => {
        setBooking({ error: "Không tìm thấy thông tin đặt chỗ!" });
      });
  };

  return (
    <div className="boxSearchBooking">
      <div className="container">
        <div className="box-item-container w-full flex  mt-[58px] mb-[100px]">
          <div className="leftBooking ">
            <div className=" mb-5 px-[5px]">
              <h2 className="title uppercase my-5 font-semibold text-[#333333] text-[20px]">
                Chuyến bay của tôi
              </h2>
              <h5 className="text-4 font-normal text-[#333333] ">
                Bạn muốn xem chuyến bay đã đặt, đổi lịch trình bay hay mua thêm
                dịch vụ hành lý, chỗ ngồi, suất ăn..., vui lòng điền thông tin
                bên dưới:
              </h5>
            </div>
            <div>
              <form
                onSubmit={props.handleSubmit(onSubmit)}
                style={{ marginTop: "30px", textAlign: "center" }}
              >
                <Field
                  name="pnr"
                  component={renderTextField}
                  label="Mã đặt chỗ"
                />
                <Field
                  name="firstName"
                  component={renderTextField}
                  label="Họ"
                />
                <Field
                  name="lastName"
                  component={renderTextField}
                  label="Tên đệm & tên"
                />
                <button className="searchTicketButton font-jambonoMedium">
                  Tìm kiếm
                </button>
              </form>
              {booking && !booking.error && (
                <div className="result">
                  <div className="content">
                    <h4 className="ui sub header">Thông tin đặt vé</h4>
                    <div className="ui small feed ticket-info">
                      <div className="event">
                        <div className="content">
                          <div className="summary">
                            <span>Mã đặt chỗ: {booking.pnr}</span>
                          </div>
                        </div>
                      </div>
                      <div className="event">
                        <div className="content">
                          <div className="summary">
                            <span>
                              Loại vé:{" "}
                              {booking.tickets.length === 2
                                ? "Khứ hồi"
                                : "Một chiều"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="event">
                        <div className="content">
                          <div className="summary">
                            <span>Hành khách: {booking.buyerName}</span>
                            <hr />
                          </div>
                        </div>
                      </div>
                      <div className="event">
                        <div className="content">
                          <div className="summary">
                            Chuyến đi:
                            {booking.tickets[0]?.flightId.startFrom.name}
                            <i
                              style={{ marginLeft: 20, marginRight: 20 }}
                              className="fas fa-plane"
                            ></i>
                            {booking.tickets[0].flightId.destination.name}
                            <div>
                              Khoang: {booking.tickets[0].type}; Ghế:{" "}
                              {booking.tickets[0].seat}
                            </div>
                            <div>
                              <span>
                                Khởi hành lúc:{" "}
                                {booking.tickets[0].flightId.takeOffTime}
                              </span>
                              <div>
                                {" "}
                                Hạ cánh lúc:{" "}
                                {booking.tickets[0].flightId.landingTime}
                              </div>

                              <hr />
                              {booking.tickets[1] && (
                                <div className="event">
                                  <div className="content">
                                    <div className="summary">
                                      Chuyến về:
                                      {
                                        booking.tickets[1].flightId.startFrom
                                          .name
                                      }
                                      <i
                                        style={{
                                          marginLeft: 20,
                                          marginRight: 20,
                                        }}
                                        className="fas fa-plane"
                                      ></i>
                                      {
                                        booking.tickets[1]?.flightId.destination
                                          .name
                                      }
                                      <div>
                                        Khoang: {booking.tickets[1].type}; Ghế:{" "}
                                        {booking.tickets[1].seat}
                                      </div>
                                      <div>
                                        <span>
                                          Khởi hành lúc:{" "}
                                          {
                                            booking.tickets[1].flightId
                                              .takeOffTime
                                          }
                                        </span>
                                        <div>
                                          {" "}
                                          Hạ cánh lúc:{" "}
                                          {
                                            booking.tickets[1].flightId
                                              .landingTime
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <hr />
                                </div>
                              )}
                              <div className="ui content">
                                Giá vé:{" "}
                                <span className="ui header red">
                                  {booking.totalPrice.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {booking && booking.error && (
                <div className="searchError">{booking.error}</div>
              )}
            </div>
          </div>
          <div className="rightBooking">
            <img
              src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/trang-chuyen-bay-cua-toi-1696232368944.jpg"
              alt=""
              width="100%"
              height="100%"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

const validate = (formValues) => {
  const error = {};
  const requiredField = ["pnr", "firstName", "lastName"];
  requiredField.forEach((field) => {
    if (!formValues[field]) {
      error[field] = "Không bỏ trống.";
    }
  });
  return error;
};

const SearchTicketForm = reduxForm({
  form: "searchTicketForm",
  validate: validate,
})(SearchTicket);

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(SearchTicketForm);
