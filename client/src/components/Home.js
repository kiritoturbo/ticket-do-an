import React, { useEffect } from "react";
import { Banner } from "../components/Banner";
import { Swiperbanner } from "../components/Swiperbanner";
import { BiSolidDownArrow } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import "./Home.scss";
import { Bannerservice } from "../components/Bannerservice";
import { Bottomservice } from "../components/Bottomservice";
import { Bannerads } from "../components/Bannerads";
import { Postboxnewpaper } from "../components/Postboxnewpaper";
import { Bannertourhome } from "../components/Bannertourhome";
import { Questionhome } from "../components/Questionhome";

export const Home = ({ setHeaderColor }) => {
  return (
    <div className="">
      <Banner />
      <div className="sm:bg-[url('../public/assets/bg-1.png')] min-h-[630px] bg-no-repeat bg-center bg-cover mt-[-90px] mb-[-75px] relative z-[1]">
        <div>
          <div className="slider max-w-[1095px] my-0 mx-auto pt-[100px] ">
            <div>
              <Swiperbanner />
            </div>
          </div>
        </div>
      </div>

      <div className="p-0 z-[1200] max-w-[1200px] mx-auto sticky top-[100px] hidden">
        <div className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] relative">
          <div className="relative h-[37px]">
            <div className="flex relative h-[100%] items-center pt-[5px] justify-around text-white font-bold  z-[1000]">
              <div className="flex items-center">
                <img src="assets/flightHorizontal.svg" alt="ảnh tickket" />
                <a href="!#" className="pl-[5px]">
                  Mua hành lý, suất ăn, chọn chỗ ngồi và hơn thế nữa...
                </a>
              </div>
              <div className="flex items-center">
                <img src="assets/SendFast.svg" alt="ảnh tickket" />
                <span>
                  <a href="!#" className="pl-[5px]">
                    Gửi hàng nhanh
                  </a>
                </span>
              </div>
              <div className="flex items-center">
                <svg width="21" height="16" viewBox="0 0 21 16" fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.77832 0C2.12147 0 0.77832 1.34315 0.77832 3V5C0.77832 5.55228 1.25284 5.97928 1.73729 6.2445C2.35765 6.5841 2.77832 7.2429 2.77832 8C2.77832 8.7571 2.35765 9.4159 1.73729 9.7555C1.25284 10.0207 0.77832 10.4477 0.77832 11V13C0.77832 14.6569 2.12147 16 3.77832 16H17.7783C19.4352 16 20.7783 14.6569 20.7783 13V11C20.7783 10.4477 20.3038 10.0207 19.8193 9.7555C19.199 9.4159 18.7783 8.7571 18.7783 8C18.7783 7.2429 19.199 6.5841 19.8193 6.2445C20.3038 5.97928 20.7783 5.55228 20.7783 5V3C20.7783 1.34315 19.4352 0 17.7783 0H3.77832ZM11.7228 4.71739C11.4115 3.82183 10.145 3.82183 9.83372 4.71739L9.59602 5.40107C9.45872 5.79614 9.09002 6.064 8.67186 6.0725L7.9482 6.0873C7.00028 6.1066 6.6089 7.3111 7.36443 7.8839L7.94121 8.3212C8.27451 8.5739 8.41534 9.0073 8.29422 9.4077L8.08462 10.1005C7.81007 11.008 8.83472 11.7524 9.61292 11.2109L10.2071 10.7975C10.5504 10.5586 11.0061 10.5586 11.3494 10.7975L11.9435 11.2109C12.7218 11.7524 13.7464 11.008 13.4719 10.1005L13.2623 9.4077C13.1412 9.0073 13.282 8.5739 13.6153 8.3212L14.1921 7.8839C14.9476 7.3111 14.5562 6.1066 13.6083 6.0873L12.8846 6.0725C12.4665 6.064 12.0978 5.79614 11.9605 5.40107L11.7228 4.71739Z"
                    fill="white"
                  ></path>
                </svg>
                <span>
                  <a href="!#" className="pl-[5px]">
                    Đổi thưởng và mua SkyPoint
                  </a>
                </span>
              </div>
              <div className="flex items-center">
                <img src="assets/CheckIn.svg" alt="" />
                <a href="!#" className="pl-[5px]">
                  Check in
                </a>
              </div>
            </div>
            <img
              src="assets/bg-2.png"
              alt=""
              className="absolute top-0 left-0 z-[1]"
            />
            <img
              src="assets/bg-3.png"
              alt=""
              className="absolute top-0 left-0 z-[100]"
            />
            <div className="bg-white">
              <div>
                <div className="flex items-center py-4 px-[15px]">
                  <div className="flex gap-3 text-[16px]  italic font-bold">
                    <div className="flex gap-1 items-center">
                      <input
                        type="radio"
                        checked
                        className="w-5 h-5 accent-yellow-300"
                        name="checkticket"
                      />{" "}
                      Khứ hồi
                    </div>
                    <div className="flex gap-1 items-center">
                      <input
                        type="radio"
                        className="w-5 h-5 accent-yellow-300"
                        name="checkticket"
                      />{" "}
                      Một chiều
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-[10px]">
                    <span className="font-bold text-[17px] "> VND</span>
                    <BiSolidDownArrow size={13} />
                  </div>
                </div>
              </div>
              <div className="flex pt-0 px-[22px] pb-[15px]">
                <div>
                  <div>
                    <div className="flex items-center h-12 border-2 overflow-hidden rounded-md border-solid border-[!#9E9E9E] ">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M6 19.5456L8 19.5456L13 11.4172L18.5 11.4172C18.8978 11.4172 19.2794 11.2566 19.5607 10.9708C19.842 10.685 20 10.2974 20 9.89314C20 9.48894 19.842 9.10128 19.5607 8.81546C19.2794 8.52965 18.8978 8.36908 18.5 8.36908L13 8.36908L8 0.240722L6 0.240722L8.5 8.36908L3 8.36908L1.5 6.33699L-2.62268e-07 6.33699L1 9.89314L-5.68248e-07 13.4493L1.5 13.4493L3 11.4172L8.5 11.4172L6 19.5456Z"
                          fill="!#333333"
                        ></path>
                      </svg>
                      <TextField
                        id="filled-basic"
                        label="Điểm khởi hành"
                        variant="outlined"
                      />
                      <div className="border-l border-solid border-[!#9E9E9E] h-[100%] flex items-center">
                        <div>
                          <p>Ngày đi</p>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <img src="assets/switchRed.svg" alt="" />
                  <div></div>
                </div>
                <div></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <div className="jss83 bannerservive mx-[15px]">
        <Bannerservice />
        <div className="container">
          <Bottomservice />
        </div>
        <div className="max-w-[1230px] mx-auto">
          <Bannerads />
        </div>
        <div className="postBox max-w-[1230px] mx-auto mt-[30px]">
          <Postboxnewpaper />
        </div>
        <div className="max-w-[1230px] mx-auto mt-[30px]">
          <Bannerads />
        </div>
        <div className="max-w-[1230px] mx-auto mt-[30px]">
          <Bannertourhome />
        </div>
        <div className="questionAlway max-w-[1230px] mx-auto mt-[30px] mb-[30px]">
          <Questionhome />
        </div>
      </div>
      <div className="topFooter jss1127">
        <div className="boxTopContent w-[952px] mx-auto flex flex-col items-center">
          <div className="imageLogoTopContent pt-10">
            <img
              className="max-w-[280px]"
              src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/files/cungvietjetbayvaotuonglai-1592297893727.png"
              alt=""
            />
          </div>
          <div className="contentTopFooter">
            <div className="itemContentTopFooter">
              <span className="numberTop">120+</span>
              <p>Đường bay nội địa và quốc tế</p>
            </div>
            <div className="itemContentTopFooter">
              <span className="numberTop">400+</span>
              <p>Chuyến bay mỗi ngày</p>
            </div>
            <div className="itemContentTopFooter">
              <span className="numberTop">6000+</span>
              <p>Nhân viên thân thiện, tận tình</p>
            </div>
            <div className="itemContentTopFooter">
              <span className="numberTop">100+</span>
              <p>Tàu bay mới hiện đại, bảo vệ môi trường</p>
            </div>
            <div className="itemContentTopFooter">
              <span className="numberTop">7★</span>
              <p>Xếp hạng hàng không an toàn cao nhất thế giới mức 7 sao</p>
            </div>
          </div>
          <div className="imageLogoBottomContent mb-[60px]">
            <img
              className="max-w-[280px]"
              src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/files/flygreenvi-1602759084211.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
