import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BiSolidUserCircle, BiSolidDownArrow } from "react-icons/bi";
import Button from "./Button";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(location.pathname === "/");
  }, [location]);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => {
    setClick(false);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return () => {
      window.removeEventListener("resize", showButton);
    };
  }, []);
  const headerStyle = {
    background: isHomePage
      ? "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.095) 100%)"
      : "#CA161C",
  };
  const postionFixed = {
    position: isHomePage ? "fixed" : "",
  };
  const logoPath = isHomePage
    ? "/assets/vj-logo.0f71c68b.svg"
    : "assets/vj-white-logo.f34b6108.svg";

  return (
    <div>
      <div
        className="w-full bg-gradient-to-b from-black/50 to-black/[0.095] p-[13px] z-[13000]"
        style={{ ...headerStyle, ...postionFixed }}
      >
        <div className="container mx-auto flex items-center justify-between text-white font-bold text-base ">
          <div>
            <Link to="/" onClick={closeMobileMenu}>
              <img className="w-[265px] h-[46px]" src={logoPath} alt="Logo" />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex justify-end">
              <div className="flex items-center ">
                {user ? (
                  <span className="mr-4">{user.username}</span>
                ) : (
                  <>
                    <BiSolidUserCircle size={17} />
                    <Link to="/car/register">
                      <span className="px-[7px] border-r-[2px] border-r-white">
                        Đăng ký
                      </span>
                    </Link>
                    <Link to="/car/login">
                      <span className="px-[7px]">Đăng nhập</span>
                    </Link>
                  </>
                )}
              </div>
              <div className=" w-[100px] relative border-[1px] border-white text-white rounded-md">
                <div className="px-[5px]">
                  <button className="font-bold">Tiếng việt</button>
                  <span className="absolute right-1 top-[50%] translate-y-[-50%]">
                    <BiSolidDownArrow size={12} />
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div>
                <ul className="flex uppercase gap-5 mt-[25px] menu-flight">
                  <li>
                    <Link to="/">
                      <a href="/">Trang chủ</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/search-booking" onClick={closeMobileMenu}>
                      <a href="/">chuyến bay của tôi</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/search-booking">
                      <a href="/">online check-in</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/select-hotel">
                      <a href="/">dịch vụ khách sạn</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/car/map-address">
                      <a href="/">dịch vụ đặt xe</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img
              src="assets/vj-logo.0f71c68b.svg"
              alt="Logo"
              className="Logo"
            />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search-booking"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Chuyến bay của tôi
              </Link>
            </li>
          </ul>
        </div>
      </nav> */}
    </div>
  );
}

export default NavBar;
