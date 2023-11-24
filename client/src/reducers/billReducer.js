import {
  createBillRequest,
  createBillSuccess,
  createBillFailed,
  getBillSuccess,
  getBillFailed,
  cancelBillSuccess,
  cancelBillFailed,
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "createBillRequest":
      return {
        ...state,
        loading: true,
      };
    case "createBillSuccess":
      return {
        ...state,
        loading: false,
        msg: action.msg,
      };
    case "createBillFailed":
      return {
        ...state,
        loading: false,
        err: action.err,
      };
    case "getBillSuccess":
      return {
        ...state,
        loading: false,
        bill: action.bill,
      };
    case "getBillFailed":
      return {
        ...state,
        loading: false,
        berr: action.err,
      };
    case "cancelBillSuccess":
      return {
        ...state,
        loading: false,
        cbmsg: action.msg,
      };
    case "cancelBillFailed":
      return {
        ...state,
        loading: false,
        cberr: action.err,
      };
    default:
      return state;
  }
};
