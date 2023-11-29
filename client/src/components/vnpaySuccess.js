import React, { useEffect, useState } from "react";
import "./bookingSuccess.css";
import { connect } from "react-redux";
import { format } from "date-fns";
import searchBooking from "../api/searchBooking";
import axios from "axios";

function VnPaySuccess() {
  console.log("this is vnpaysuccess");
  const [booking, setBooking] = useState(null);
  const props = JSON.parse(localStorage.getItem("paymentState"));
  // useEffect(() => {
  //   const handleReturnUrl = async () => {
  //     // Xử lý kết quả trả về từ trang vnp_ReturnUrl
  //     try {
  //       const response = await fetch("/order/vnpay_return", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         // Có thể cần truyền thêm thông tin từ trang return URL
  //         body: JSON.stringify({
  //           // Thông tin cần thiết từ URL hoặc state của trang
  //         }),
  //       });
  //       const data = await response.json();
  //       console.log("data return" + data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   handleReturnUrl();
  // }, []);
  useEffect(() => {
    // Chỉ gọi API khi props.pnr tồn tại
    //   if (props.pnr && props.buyerName) {
    searchBooking
      .get(`booking/pnr/${props.pnr}?fullname=${props.buyerName}`)
      .then((res) => {
        console.log(res.data[0]);
        setBooking(res.data[0]);
        const data = res.data[0];
        console.log(res);
        const takeOffTime = new Date(data.tickets[0].flightId.takeOffTime);
        const landingTime = new Date(data.tickets[0].flightId.landingTime);
        data.tickets[0].flightId.takeOffTime = takeOffTime.toLocaleString();
        data.tickets[0].flightId.landingTime = landingTime.toLocaleString();
        if (data.tickets[1]) {
          data.tickets[1].flightId.takeOffTime = takeOffTime.toLocaleString();
          data.tickets[1].flightId.landingTime = landingTime.toLocaleString();
        }
        //   setBooking(data);
      })
      .catch((error) => {
        console.log(error);
        setBooking({ error: "Thông tin đặt chỗ!" });
      });
    //   }
  }, [props.pnr, props.buyerName]); // Chạy effect này khi props.pnr hoặc props.buyerName thay đổi

  console.log(props);
  return (
    <div className="bookingSuccess">
      <div className="ui card ticket">
        <div className="content">
          <div className="header header--green">Đặt vé thành công!</div>
        </div>
        <div className="content">
          <div className="ui small feed ticket-info">
            <div className="event">
              <div className="content">
                <div className="summary center">
                  <span>Mã đặt chỗ: {props.pnr}</span>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary center">
                  <span>Hành khách: {props.buyerName}</span>
                  <hr />
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary center">
                  {booking?.tickets[0]?.flightId.startFrom.name}
                  <i
                    style={{ marginLeft: 20, marginRight: 20 }}
                    className="fas fa-plane"
                  ></i>
                  {booking?.tickets[0].flightId.destination.name}
                  <p>
                    Khoang: {booking?.tickets[0].type}; Ghế:{" "}
                    {booking?.tickets[0].seat}
                  </p>

                  <div>
                    <span>
                      Khởi hành lúc: {booking?.tickets[0].flightId.takeOffTime}
                    </span>
                    <div>
                      {" "}
                      Hạ cánh lúc: {booking?.tickets[0].flightId.landingTime}
                    </div>
                    <hr />
                    {booking?.tickets[1] && (
                      <div className="event">
                        <div className="content">
                          <div className="summary center">
                            {booking?.tickets[1].flightId.startFrom.name}
                            <i
                              style={{ marginLeft: 20, marginRight: 20 }}
                              className="fas fa-plane"
                            ></i>
                            {booking?.tickets[1]?.flightId.destination.name}
                            {props.selectedReturnSeat &&
                              props.selectedReturnSeat[0] && (
                                <p>
                                  Khoang: {props.returnFlight.type} Ghế:{" "}
                                  {props.selectedReturnSeat[0].id}
                                </p>
                              )}
                            <div>
                              <span>
                                Khởi hành lúc:{" "}
                                {booking.tickets[1].flightId.takeOffTime};
                              </span>
                              <div>
                                {" "}
                                Hạ cánh lúc:{" "}
                                {booking?.tickets[1].flightId.landingTime}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    )}
                    <div className="ui content">
                      Tổng giá vé:{" "}
                      <span className="ui header red">
                        {props.totalPrice.toLocaleString("it-IT", {
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
    </div>
  );
}

export default VnPaySuccess;
