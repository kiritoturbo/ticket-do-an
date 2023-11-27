import {
  SEARCH_FLIGHTS,
  SELECT_FLIGHT,
  SELECT_SEAT,
  REMOVE_SEAT,
  FETCH_AIRPORTS,
  CREATE_TICKET,
  SEARCH_RETURN_FLIGHTS,
  SELECT_RETURN_FLIGHT,
  SELECT_RETURN_SEAT,
  REMOVE_RETURN_SEAT,
  getMarkers,
  getDistance,
  signinFailed,
  signinRequest,
  signinSuccess,
  signupFailed,
  signupRequest,
  signupSuccess,
  createBillRequest,
  createBillSuccess,
  createBillFailed,
  getBillSuccess,
  getBillFailed,
  cancelBillSuccess,
  cancelBillFailed,
} from "./types";
import Flight from "../api/Flight";
import history from "../history";
import Airport from "../api/Airport";
import { reset } from "redux-form";
import axios from "axios";
var markers = [];
var markerDetails = [];
let distance;
let totalTime;
let pricePerKm = 4;

let serverUri = process.env.REACT_APP_SERVER_URI;
// let token = window.localStorage.getItem("token");

const token = window.localStorage.getItem("token");
console.log("token" + token);

export const getAllMarkers = (marker, result, type) => async (dispatch) => {
  if (markers.length < 2) {
    markers = [...markers, { marker: marker, type: type }];
    markerDetails = [...markerDetails, { result: result, type: type }];
  } else {
    let removeableMarkers = markers.filter((obj) => obj.type == type);
    removeableMarkers.map((mar) => {
      mar.marker.remove();
    });

    markers = markers.filter((obj) => obj.type != type);
    markerDetails = markerDetails.filter((obj) => obj.type != type);
    markers = [...markers, { marker: marker, type: type }];
    markerDetails = [...markerDetails, { result: result, type: type }];
  }

  console.log(markers);
  dispatch({
    type: "getMarkers",
    markers: markers,
    details: markerDetails,
  });
};

export const storeDistanceTime = (totalDis, time) => async (dispatch) => {
  distance = totalDis;
  totalTime = time;
  dispatch({
    type: "getDistance",
    tDistance: distance,
    totalTime: totalTime,
    pricePerKm: pricePerKm,
  });
};

export const removeAllMarkers = () => async (dispatch) => {
  markers = [];
  markerDetails = [];
};
//user
export const signupUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "signupRequest" });

      let msg = await axios.post(
        serverUri + "/signup",
        { email: email, password: password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (msg.data.token != undefined) {
        window.localStorage.setItem("token", msg.data.token);
        dispatch({
          type: "signupSuccess",
          msg: msg.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: "signupFailed",
        err: error.response.data.err,
      });
    }
  };

export const signinUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "signinRequest" });

      let msg = await axios.post(
        serverUri + "/login",
        { email: email, password: password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const username = msg.data.userName;
      const usname = username.split("@")[0];
      console.log(usname);
      if (msg.data.token != undefined) {
        window.localStorage.setItem("user", usname);
        window.localStorage.setItem("token", msg.data.token);
        dispatch({
          type: "signinSuccess",
          msg: msg.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: "signinFailed",
        err: error.response.data.err,
      });
    }
  };
//end user
export const createBill =
  ({ locations, car, datetime, grandTotal, image }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "createBillRequest" });

      let msg = await axios.post(
        serverUri + "/createbill",
        {
          locations: locations,
          car: car,
          datetime: datetime,
          grandtotal: grandTotal,
          image: image,
        },
        {
          headers: {
            token: token,
            "Content-type": "application/json",
          },
        }
      );
      dispatch({
        type: "createBillSuccess",
        msg: msg.data.msg,
      });
    } catch (error) {
      dispatch({
        type: "createBillFailed",
        err: error.response.data.msg,
      });
    }
  };

export const getBill = () => async (dispatch) => {
  try {
    let bill = await axios.get(serverUri + "/getbill", {
      headers: {
        token: token,
        "Content-type": "application/json",
      },
    });
    dispatch({
      type: "getBillSuccess",
      bill: bill.data[0],
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "getBillFailed",
      err: error.response ? error.response.data.msg : "Unknown error",
    });
  }
};

export const cancelBooking = (id) => async (dispatch) => {
  console.log(id);
  try {
    let msg = await axios.delete(serverUri + `/cancelbill/${id}`, {
      headers: {
        token: token,
        "Content-type": "application/json",
      },
    });
    dispatch({
      type: "cancelBillSuccess",
      msg: msg.data.msg,
    });
  } catch (error) {
    dispatch({
      type: "cancelBillFailed",
      err: error.response.data.msg,
    });
  }
};

//billcar

//end bill car
export const searchFlights = (query) => {
  console.log(query);
  return async (dispatch) => {
    const response = await Flight.get("/flight/search", {
      params: query,
    });
    dispatch({
      type: SEARCH_FLIGHTS,
      payload: response.data,
    });
    history.push("/select-flight");
  };
};

export const searchReturnFlights = (query) => {
  return async (dispatch) => {
    const response = await Flight.get("/flight/search", {
      params: query,
    });
    dispatch({
      type: SEARCH_RETURN_FLIGHTS,
      payload: response.data,
    });
    history.push("/select-flight");
  };
};

export const selectFlight = (flight) => {
  return {
    type: SELECT_FLIGHT,
    payload: flight,
  };
};

export const selectReturnFlight = (flight) => {
  return {
    type: SELECT_RETURN_FLIGHT,
    payload: flight,
  };
};

export const selectSeat = (seat) => {
  return {
    type: SELECT_SEAT,
    payload: seat,
  };
};

export const removeSeat = (seat) => {
  return {
    type: REMOVE_SEAT,
    payload: seat,
  };
};

export const selectReturnSeat = (seat) => {
  return {
    type: SELECT_RETURN_SEAT,
    payload: seat,
  };
};

export const removeReturnSeat = (seat) => {
  return {
    type: REMOVE_RETURN_SEAT,
    payload: seat,
  };
};

export const fetchAirports = () => async (dispatch) => {
  const res = await Airport.get("/airport");
  dispatch({
    type: FETCH_AIRPORTS,
    payload: res.data,
  });
};

export const createTicket = (ticket) => {
  return {
    type: CREATE_TICKET,
    payload: ticket,
  };
};

export const resetAllForm = () => async (dispatch) => {
  dispatch(reset("passenger"));
};
