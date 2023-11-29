import React from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import "./bookingInfo.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function BookingInFor(props) {
  console.log(props);
  const renderSelectFlight = () => {
    if (!props.selectedFlight) {
      return null;
    }
    return (
      <div>
        <div>
          Khởi hành lúc:{" "}
          {format(
            new Date(props.selectedFlight.takeOffTime),
            "dd/MM/yyyy HH:mm"
          )}
        </div>
        <div>
          Hạ cánh lúc:{" "}
          {format(
            new Date(props.selectedFlight.landingTime),
            "dd/MM/yyyy HH:mm"
          )}
        </div>
        <div>Loại vé: {props.selectedFlight.type}</div>
        <div className="ui content">
          Giá vé:{" "}
          <span className="ui text-[20px] font-jambonoMedium mb-3 red">
            {parseInt(props.selectedFlight.price.value).toLocaleString(
              "it-IT",
              { style: "currency", currency: "VND" }
            )}
          </span>
        </div>
        <div className="ui content">
          Thuế:
          <span className="ui text-[20px] font-jambonoMedium mb-3 red">
            {parseInt(props.selectedFlight.price.tax).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div>
    );
  };

  const renderSelectedReturnFlight = () => {
    if (!props.selectedReturnFlight) return null;

    return (
      <div>
        <div>
          Khởi hành lúc:
          {/* {props.selectedReturnFlight.takeOffTime} */}
          {format(
            new Date(props.selectedReturnFlight.takeOffTime),
            "dd/MM/yyyy HH:mm"
          )}
        </div>
        <div>
          Hạ cánh lúc:
          {/* {props.selectedReturnFlight.landingTime} */}
          {format(
            new Date(props.selectedReturnFlight.landingTime),
            "dd/MM/yyyy HH:mm"
          )}
        </div>
        <div>Loại vé: {props.selectedReturnFlight.type}</div>
        <div className="ui content">
          Giá vé:
          <span className="ui text-[20px] font-jambonoMedium mb-3 red">
            {parseInt(props.selectedReturnFlight.price.value).toLocaleString(
              "it-IT",
              { style: "currency", currency: "VND" }
            )}
          </span>
        </div>
        <div className="ui content">
          Thuế:
          <span className="ui text-[20px] font-jambonoMedium mb-3 red">
            {parseInt(props.selectedReturnFlight.price.tax).toLocaleString(
              "it-IT",
              { style: "currency", currency: "VND" }
            )}
          </span>
        </div>
      </div>
    );
  };

  let totalPrice = 0;
  if (props.selectedFlight) {
    totalPrice += props.selectedFlight.totalPrice;
  }
  if (props.selectedReturnFlight) {
    totalPrice += props.selectedReturnFlight.totalPrice;
  }
  return (
    <div class="ui card customCard">
      {/* <div class="content">
        <div class="header">Thông tin đặt chỗ</div>
      </div>
      <div class="content">
        <h4 class="ui sub header">Thông tin hành khách</h4>
        <div class="ui small feed">
          <div class="event">
            <div class="content">
              <div class="summary">
                {props.passenger.firstName && (
                  <span>Họ và tên: {props.passenger.firstName}</span>
                )}
                {props.passenger.lastName && (
                  <span>{" " + props.passenger.lastName}</span>
                )}
                {props.passenger.passengerId && (
                  <p>CMND: {props.passenger.passengerId}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <h4 class="ui header">Chuyến đi</h4>
        <div class="ui small feed">
          <div class="event">
            <div class="content">
              <div class="summary">
                {props.startFrom.name}
                <i
                  style={{ marginLeft: 20, marginRight: 20 }}
                  class="fas fa-plane"
                ></i>
                {props.destination.name}
                {renderSelectFlight()}
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.type === "roundtrip" && (
        <div className="content">
          <h4 class="ui header">Chuyến về</h4>
          <div class="ui small feed">
            <div class="event">
              <div class="content">
                <div class="summary">
                  {props.destination.name}
                  <i
                    style={{ marginLeft: 20, marginRight: 20 }}
                    class="fas fa-plane"
                  ></i>
                  {props.startFrom.name}
                  {renderSelectedReturnFlight()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div class="extra content">
        <div class="header">
          Tổng tiền:{" "}
          <span className="ui header red">
            {totalPrice.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div> */}

      <div className="rightContentFlight">
        <div className=" overflow-hidden rounded-md">
          <div className="title">
            <div>
              <h3>Thông tin đặt chỗ</h3>
            </div>
          </div>
          <div className="titleInfoUser py-[16px] px-[20px]">
            <div className="flex flex-col justify-center items-center">
              <div>Thông tin hành khách</div>
              <div class="summary">
                {props.passenger.firstName && (
                  <span>Họ và tên: {props.passenger.firstName}</span>
                )}
                {props.passenger.lastName && (
                  <span>{" " + props.passenger.lastName}</span>
                )}
                {props.passenger.passengerId && (
                  <p>CMND: {props.passenger.passengerId}</p>
                )}
              </div>
            </div>
          </div>
          <div className="checkoutFlight">
            <div className="flex justify-between">
              <span className="text-[#EC2029] font-bold text-[18px]">
                Chuyến đi
              </span>
              <span className="text-[#EC2029] font-bold text-[18px]">
                {props.selectedFlight?.totalPrice} VND
              </span>
            </div>
          </div>
          <div className="boxCheckoutContent">
            <div className="contentCheckoutFlight">
              <div>
                <div className="topCheckout">
                  <div className="trafficFromTo flex items-center">
                    <h5>{props.startFrom.name}</h5>
                    <span>
                      <img src="assets/vietjet.36ac4568.svg" alt="vietjet" />
                    </span>
                    <h5>{props.destination.name}</h5>
                  </div>
                  <div className="infoDateFromTo">
                    {/* {renderSelectFlight()} */}
                    {/* <h5>T6, 10/11/2023 | 05:15 - 07:25 | VJ198 | Eco</h5> */}
                  </div>
                </div>
                <div className="InputCheckout">
                  {/* <div>
                    <InputCheckout title={"Giá vé"} price={"2.678.400"} />
                  </div>
                  <div>
                    <InputCheckout title={"Thuế, phí"} price={"1.168.000"} />
                  </div>
                  <div>
                    <InputCheckout title={"Dịch vụ"} price={"0"} />
                  </div> */}
                  {/* {props.startFrom.name}
                  <i
                    style={{ marginLeft: 20, marginRight: 20 }}
                    class="fas fa-plane"
                  ></i>
                  {props.destination.name} */}
                  {renderSelectFlight()}
                </div>
              </div>
            </div>
          </div>
          {props.type === "roundtrip" && (
            <div>
              <div className="checkoutFlight">
                <div className="flex justify-between">
                  <span className="text-[#EC2029] font-bold text-[18px]">
                    Chuyến về
                  </span>
                  <span className="text-[#EC2029] font-bold text-[18px]">
                    {props.selectedReturnFlight?.totalPrice} VND
                  </span>
                </div>
              </div>
              <div className="boxCheckoutContent">
                <div className="contentCheckoutFlight">
                  <div>
                    <div className="topCheckout">
                      <div className="trafficFromTo flex items-center">
                        <h5>{props.destination.name}</h5>
                        <span>
                          <img
                            src="assets/vietjet.36ac4568.svg"
                            alt="vietjet"
                          />
                        </span>
                        <h5>{props.startFrom.name}</h5>
                      </div>
                      <div className="infoDateFromTo">
                        {/* <h5>T6, 10/11/2023 | 05:15 - 07:25 | VJ198 | Eco</h5> */}
                      </div>
                    </div>
                    <div className="InputCheckout">
                      {/* {props.destination.name}
                      <i
                        style={{ marginLeft: 20, marginRight: 20 }}
                        class="fas fa-plane"
                      ></i>
                      {props.startFrom.name} */}
                      {renderSelectedReturnFlight()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="totalCheckout">
            <h4>Tổng tiền</h4>
            <span>
              {totalPrice.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        </div>
      </div>
      {/* <div className="footerSelectFlightBox ">
        <div className="container flex justify-between items-center">
          <div className="backButton">
            <Link to="/select-flight">
              <button>Quay lại</button>
            </Link>
          </div>
          <div className="totalCheckoutFooter">
            <h5>Tổng tiền</h5>
            <h4>
              {totalPrice.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </h4>
          </div>
          <div className="nextButton">
            <Link to="/passengers">
              <button>Đi tiếp</button>
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  );
}

const selector = formValueSelector("FormBooking");
const selectorPassenger = formValueSelector("passenger");

const mapStateToProps = (state) => {
  const selectedFlight = state.selectedFlight;
  // if (selectedFlight) {
  //   const takeOffTime = new Date(selectedFlight.takeOffTime);
  //   selectedFlight.takeOffTime = takeOffTime.toLocaleString();
  //   const landingTime = new Date(selectedFlight.landingTime);
  //   selectedFlight.landingTime = landingTime.toLocaleString();
  // }
  const selectedReturnFlight = state.selectedReturnFlight;
  // if (selectedReturnFlight) {
  //   const takeOffTime = new Date(selectedReturnFlight.takeOffTime);
  //   selectedReturnFlight.takeOffTime = takeOffTime.toLocaleString();
  //   const landingTime = new Date(selectedReturnFlight.landingTime);
  //   selectedReturnFlight.landingTime = landingTime.toLocaleString();
  // }
  return {
    startFrom: selector(state, "startFrom"),
    destination: selector(state, "destination"),
    selectedFlight: selectedFlight,
    selectedReturnFlight: selectedReturnFlight,
    type: selector(state, "type"),
    passenger: selectorPassenger(state, "firstName", "lastName", "passengerId"),
  };
};

export default connect(mapStateToProps)(BookingInFor);
