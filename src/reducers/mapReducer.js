import { getMarkers, getDistance } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case getMarkers:
      return {
        ...state, // Giữ nguyên các giá trị khác trong state
        allMarkers: action.markers,
        markerDetails: action.details,
      };
    case getDistance:
      return {
        ...state,
        totalDistance: action.tDistance,
        totalTime: action.totalTime,
        pricePerKm: action.pricePerKm,
      };
    default:
      return state;
  }
};
