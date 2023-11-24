import React, { useState, useEffect } from "react";
import "./ScrollToTopButton.css";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Hiển thị hoặc ẩn nút dựa trên vị trí scroll
    const scrollY = window.scrollY;
    const threshold = 200;

    if (scrollY > threshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    // Cuộn lên đầu trang khi nút được nhấp
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Đăng ký sự kiện scroll khi component được mount
    window.addEventListener("scroll", handleScroll);

    // Hủy đăng ký sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // [] để chỉ đăng ký sự kiện một lần khi component được mount

  return (
    <div>
      {isVisible && (
        <>
          <button
            onClick={scrollToTop}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Scroll to top"
            data-tooltip-place="top"
            className="scroll-to-top-button"
          >
            <MdKeyboardArrowUp size={36} />
          </button>
          <Tooltip id="my-tooltip" />
        </>
      )}
    </div>
  );
};

export default ScrollToTopButton;
