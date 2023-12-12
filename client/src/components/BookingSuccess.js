import React from "react";
import "./bookingSuccess.css";
import { connect } from "react-redux";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import { toast } from "react-toastify";
import Booking from "../api/Booking";
function BookingSuccess(props) {
  console.log(props);
  const { ticket, flight, returnFlight } = props;
  const qrcode = `Mã đặt vé: ${ticket.pnr}| Tên người đặt : ${
    ticket.buyerName
  } | Tổng tiền: ${ticket.totalPrice.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  })}`;
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
  const handleSendEmail = () => {
    Booking.post("/booking/email", { props }).then((res) => {
      console.log(res);
      toast.success(`Đã gửi tới email ${res.data}`);
      return;
    });
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
                  <span>Mã đặt chỗ: {ticket.pnr}</span>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary center">
                  <span>Hành khách: {ticket.buyerName}</span>
                  <hr />
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary center">
                  {flight.startFrom.name}
                  <i
                    style={{ marginLeft: 20, marginRight: 20 }}
                    class="fas fa-plane"
                  ></i>
                  {flight.destination.name}
                  {props.selectedSeat && props.selectedSeat[0] && (
                    <p>
                      Khoang: {props.flight.type} Ghế:{" "}
                      {props.selectedSeat[0].id}
                    </p>
                  )}
                  <div>
                    <span>
                      Khởi hành lúc:{" "}
                      {format(new Date(flight.takeOffTime), "dd/MM/yyyy HH:mm")}
                    </span>
                    <div>
                      {" "}
                      Hạ cánh lúc:{" "}
                      {format(new Date(flight.landingTime), "dd/MM/yyyy HH:mm")}
                    </div>
                    <hr />
                    {returnFlight && (
                      <div className="event">
                        <div className="content">
                          <div className="summary center">
                            {returnFlight.startFrom.name}
                            <i
                              style={{ marginLeft: 20, marginRight: 20 }}
                              class="fas fa-plane"
                            ></i>
                            {returnFlight.destination.name}
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
                                {format(
                                  new Date(returnFlight.takeOffTime),
                                  "dd/MM/yyyy HH:mm"
                                )}
                              </span>
                              <div>
                                {" "}
                                Hạ cánh lúc:{" "}
                                {format(
                                  new Date(returnFlight.landingTime),
                                  "dd/MM/yyyy HH:mm"
                                )}
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
                        {ticket.totalPrice.toLocaleString("it-IT", {
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

const mapStateToProps = (state) => {
  const flight = state.selectedFlight;
  // const takeOffTime = new Date(flight.takeOffTime);
  // const landingTime = new Date(flight.landingTime);
  // // flight.takeOffTime = takeOffTime.toLocaleString();
  // // flight.landingTime = landingTime.toLocaleString();
  // flight.takeOffTime = format(takeOffTime, "dd/MM/yyyy HH:mm");
  // flight.landingTime = format(landingTime, "dd/MM/yyyy HH:mm");

  const returnFlight = state.selectedReturnFlight;
  // if (returnFlight) {
  //   const takeOffTime2 = new Date(returnFlight.takeOffTime);
  //   const landingTime2 = new Date(returnFlight.landingTime);
  //   returnFlight.takeOffTime = format(takeOffTime2, "dd/MM/yyyy HH:mm");
  //   returnFlight.landingTime = format(landingTime2, "dd/MM/yyyy HH:mm");
  // }

  return {
    ticket: state.ticket,
    flight: flight,
    returnFlight: returnFlight,
    selectedSeat: Object.values(state.selectedSeat),
    selectedReturnSeat: Object.values(state.selectedReturnSeat),
  };
};

export default connect(mapStateToProps)(BookingSuccess);
