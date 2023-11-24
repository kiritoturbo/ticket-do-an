import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import BookingInFor from "./BookingInFor";
import { formValueSelector } from "redux-form";
import { Link, useNavigate } from "react-router-dom";
import { searchFlights, searchReturnFlights } from "../actions";
//import ListFlight from './ListFlight';
import logo from "../public/images/logo192.png";
import ThreeDots from "./ThreeDots";
import "./SelectFlight.css";
import format from "date-fns/format";
const ListFlight = lazy(() => import("./ListFlight"));

function SelectFlight(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.startFrom) {
      props.searchFlights({
        date: props.departureDay,
        start: props.startFrom._id,
        destination: props.destination._id,
        passenger: 1,
      });
      if (props.type === "roundtrip") {
        props.searchReturnFlights({
          date: props.returnDay,
          start: props.destination._id,
          destination: props.startFrom._id,
          passenger: 1,
        });
      }
    }
  }, []);
  const departureDay = format(new Date(props?.departureDay), "dd/MM/yyyy ");
  const returnDay = format(
    new Date(props.returnDay ? props.returnDay : null),
    "dd/MM/yyyy "
    // HH:mm
  );
  const renderFlights = () => {
    if (!props.flights) {
      return <div></div>;
    } else {
      return (
        <div className="contentSelectFlight mt-5">
          {/* <div className="ui container grid" style={{ marginTop: 20 }}>
          <div className="eleven wide column">
            <Suspense fallback={ThreeDots}>
              {props.flights.length === 0 ? (
                <div>Không có chuyến bay nào.</div>
              ) : (
                <>
                  <h3 className="ui header customHeader">
                    Chuyến bay đi: {departureDay}
                  </h3>
                  <ListFlight type="oneway" flights={props.flights} />
                  {props.type === "roundtrip" && (
                    <>
                      <h3 className="ui  customHeader">
                        Chuyến bay về: {returnDay}
                      </h3>
                      <ListFlight
                        type="roundtrip"
                        flights={props.returnFlights}
                      />
                    </>
                  )}
                  <div
                    className="div"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginTop: "35px",
                      marginBottom: "40px",
                    }}
                  >
                    <Link to="/" className="ui button">
                      Quay lại
                    </Link>
                    <Link to="/passengers" className="ui button primary">
                      Tiếp tục
                    </Link>
                  </div>
                </>
              )}
            </Suspense>
          </div>
          <div className="five wide column customSixColumn">
            <BookingInFor />
          </div>
        </div> */}
          <div className="flex container">
            <div className="leftContentFlight w-[70%]  sm:pr-[30px]">
              <div className="tabBottomContentLeft mt-[30px] ">
                <div className="resultTabsContent">
                  <div className="rounded-md">
                    <div className="min-h-[96px]  ">
                      {/* <div className="timeBox flex flex-col justify-center w-[27%] py-[10px]">
                        <div>
                          <span className="font-medium text-[#3C3C3C] text-[12px]">
                            VJ198
                          </span>
                        </div>
                        <div className="text-[26px] font-bold ">
                          <div>
                            05:15
                            <span class="text-[12px] font-medium"> Đến </span>
                            07:25
                          </div>
                        </div>
                        <div className="text-[16px] font-bold leading-3 text-center">
                          <span class="text-[12px] font-medium">
                            Airbus A320
                          </span>
                          <div class="flex justify-center mt-2">
                            <svg
                              class=" w-[14px] mt-[-5px] h-[1em]"
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              role="presentation"
                            >
                              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="priceBox w-[73%] flex">
                        <div className="itemPriceBox flex items-center justify-center">
                          <div>
                            <div class="flex flex-col items-center">
                              <img src="assets/noflight.cee84207.svg" alt="" />
                              <p class="" customcolor="grey" weight="Bold">
                                Hết chỗ
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="itemPriceBox flex items-center justify-center wrap">
                          <div>
                            <div class="text-[16px] font-bold text-[#333333] font-jambonoMedium">
                              <p
                                class="px-[33px] py-[25px]"
                                customcolor="grey"
                                weight="Bold"
                              >
                                3.690.000đ
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="itemPriceBox flex items-center justify-center">
                          <div>
                            <div class="text-[16px] font-bold text-[#333333] font-jambonoMedium">
                              <p class="" customcolor="grey" weight="Bold">
                                3.690.000đ
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="itemPriceBox flex items-center justify-center">
                          <div>
                            <div class="text-[16px] font-bold text-[#333333] font-jambonoMedium">
                              <p class="" customcolor="grey" weight="Bold">
                                3.690.000đ
                              </p>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <Suspense fallback={ThreeDots}>
                        {props.flights.length === 0 ? (
                          <div>Không có chuyến bay nào.</div>
                        ) : (
                          <>
                            <h3 className="ui text-[20px] font-jambonoMedium mb-3 customHeader">
                              Chuyến bay đi: {departureDay}
                            </h3>
                            <ListFlight type="oneway" flights={props.flights} />
                            {props.type === "roundtrip" && (
                              <>
                                <h3 className="ui text-[20px] font-jambonoMedium mb-3 mt-5 customHeader">
                                  Chuyến bay về: {returnDay}
                                </h3>
                                <ListFlight
                                  type="roundtrip"
                                  flights={props.returnFlights}
                                />
                              </>
                            )}
                            <div
                              className="div"
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                marginTop: "35px",
                                marginBottom: "40px",
                              }}
                            >
                              <Link to="/" className="ui button">
                                Quay lại
                              </Link>
                              <Link
                                to="/passengers"
                                className="ui button primary"
                              >
                                Tiếp tục
                              </Link>
                            </div>
                          </>
                        )}
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rightContentFlight w-[30%] ">
              <BookingInFor />
            </div>
          </div>
        </div>
      );
    }
  };
  // if (!props.startFrom) return <Redirect to="/" />;
  if (!props.startFrom) {
    navigate("/");
    return null; // hoặc thêm các phần tử JSX khác bạn cần render ở đây
  }
  return (
    <div className="backgroundCustom">
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
              Điểm Khởi hành: <span>{props.startFrom.name}</span>
            </p>
            <p>
              <i
                style={{ marginRight: 10 }}
                className="fas fa-map-marker-alt"
              ></i>
              Điểm đến: <span>{props.destination.name}</span>
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
      {renderFlights()}
    </div>
  );
}

const selector = formValueSelector("FormBooking");
const mapStateToProps = (state) => {
  return {
    startFrom: selector(state, "startFrom"),
    destination: selector(state, "destination"),
    departureDay: selector(state, "departureDay"),
    returnDay: selector(state, "returnDay"),
    type: selector(state, "type"),
    flights: Object.values(state.flights),
    returnFlights: Object.values(state.returnFlights),
  };
};

export default connect(mapStateToProps, { searchFlights, searchReturnFlights })(
  SelectFlight
);
