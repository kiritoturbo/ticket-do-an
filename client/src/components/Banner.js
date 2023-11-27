import React, { useContext, useState } from "react";
import { BiSolidDownArrow, BiSolidUser } from "react-icons/bi";
import { ReactComponent as IconFlight } from "../icons/icon-flight.svg";
import { ReactComponent as IconCounpon } from "../icons/icon-coupon.svg";
import { ReactComponent as IconArrowDown } from "../icons/icon-arrow-down.svg";
import { ReactComponent as IconRSFlight } from "../icons/icon-rsflight.svg";
import { Bannerbottomheader } from "./Bannerbottomheader";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import FormBookingCard from "./FormBookingCard";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
export const Banner = () => {
  return (
    <div className="relative w-full min-h-[500px] ">
      <Bannerbottomheader />
      <div className="sm:absolute top-0 left-0 right-0 bottom-0 w-full h-[100%] container mx-auto z-10">
        <div className="h-[100%] flex items-center justify-end container m-auto">
          <div className="right-0 sm:max-w-[380px] mt-0 ">
            <div className="flex w-full items-stretch justify-center font-bold font-[JambonoMedium]">
              <button className="sm:h-[52px] bg-gradient-to-r from-[#d91a21cc] to-[#6f0000cc] text-white sm:w-[53%] rounded-t-[5px] py-[6px] px-2">
                <span className="">
                  <a href="/" className="text-[14px] w-full block">
                    Mua hành lý, suất ăn, chọn chỗ ngồi và hơn thế nữa...
                  </a>
                </span>
              </button>
              <button className="min-w-[102px] sm:h-[52px] bg-gradient-to-r from-[#FFDD00] to-[#E99F24] text-black w-[64px] rounded-t-[5px]">
                <span>
                  <a href="/" className="text-[14px]">
                    Đổi thưởng & Mua SkyPoint
                  </a>
                </span>
              </button>
              <button className="sm:h-[52px] bg-gradient-to-r from-[#d91a21cc] to-[#6f0000cc] text-white w-[20%] rounded-t-[5px]">
                <span>
                  <a href="/" className="text-[14px]">
                    Gửi hàng nhanh
                  </a>
                </span>
              </button>
            </div>
            <div className="bg-gradient-to-r from-[#d91a21ba] to-[#6F0000] rounded-b-md min-h-[315px]">
              <FormBookingCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
