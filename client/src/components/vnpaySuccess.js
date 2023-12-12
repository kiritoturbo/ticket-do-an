import React, { useEffect, useState } from "react";
import "./bookingSuccess.css";
import { connect } from "react-redux";
import { format } from "date-fns";
import searchBooking from "../api/searchBooking";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import Booking from "../api/Booking";

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
  async function checkEmailValidity(email) {
    const apiKey = "at_dkZaCaXnR2pYYHrk6QS0qrQWrgASn"; // Thay thế bằng khóa API của bạn
    const apiUrl = `https://emailverification.whoisxmlapi.com/api/v3?apiKey=at_dkZaCaXnR2pYYHrk6QS0qrQWrgASn&emailAddress=${email}`;
    try {
      const response = await axios.get(apiUrl);
      const result = response.data;

      // Kiểm tra kết quả từ API
      if (result.formatCheck === "true" && result.smtpCheck === "true") {
        console.log(`${email} là địa chỉ email hợp lệ.`);
      } else {
        console.log(`${email} không phải là địa chỉ email hợp lệ.`);
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra địa chỉ email:", error.message);
    }
  }

  const handleSendEmail = () => {
    // checkEmailValidity("manhtruong2001nt@gmail.com");
    Booking.post("/booking/email", { props })
      .then((res) => {
        console.log(res);
        toast.success(`Đã gửi tới email ${res.data}`);
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const qrcode = `Mã đặt vé: ${props.pnr}| Tên người đặt : ${props.buyerName} | Tổng tiền: ${props.totalPrice}
   `;

  const downloadQRCode = () => {
    console.log(document.querySelector("#qrcode"));
    // Lấy đối tượng SVG của QR code từ useRef
    const svg = document.querySelector("#qrcode");

    // Chuyển đổi SVG thành chuỗi để tạo Blob
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });

    try {
      // Sử dụng thư viện file-saver để download
      saveAs(blob, "qrcode.svg");
      toast.success("Tải mã QRcode thành công");
    } catch (error) {
      toast.error(error);
    }
  };
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
        <div className="flex justify-center mb-3">
          <QRCodeSVG size={128} id="qrcode" value={qrcode} bgColor="#0000" />
        </div>
      </div>
      <div className="flex items-center gap-5 w-full justify-center">
        <button
          onClick={handleSendEmail}
          className="btnSearchForm font-bold font-[jambonoMedium] text-[#333] select-none text-[16px] w-full h-[39px] max-w-[200px] rounded-[10px] bg-gradient-to-r from-[#F9A51A] to-[#FFDD00] css-jh47zj-MuiButtonBase-root-MuiButton-root"
        >
          Gửi Email
        </button>

        <button
          onClick={downloadQRCode}
          className="btnSearchForm font-bold font-[jambonoMedium] text-[#333] select-none text-[16px] w-full h-[39px] max-w-[200px] rounded-[10px] bg-gradient-to-r from-[#F9A51A] to-[#FFDD00] css-jh47zj-MuiButtonBase-root-MuiButton-root"
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
}

export default VnPaySuccess;
