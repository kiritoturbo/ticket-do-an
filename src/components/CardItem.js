import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import "./CardItem.css";

function CardItem(props) {
  //const [showModal, setShowModal] = useState(false);
  return (
    <div onClick={() => props.onOutSideClick()} className=" ">
      <div className="boxSeat">
        <div className="left-content ">
          <img src={props.src} alt="seat" className="w-[93px] h-[80px]" />
          <div className="centerBoxSeat">
            <span>{props.heading}</span>
            <span>{props.description}</span>
          </div>
        </div>
        <div className="right-content">
          <i class="fas fa-chevron-right"></i>
        </div>
        {props.showModal && (
          <Modal
            header={props.heading}
            content={props.content}
            actions={props.actions}
          />
        )}
      </div>
    </div>
  );
}

export default CardItem;
