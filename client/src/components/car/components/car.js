import "../App.css";
import { useSelector } from "react-redux";

export default function Car({ details, setState, setSelectedBrand }) {
  const { totalDistance, pricePerKm } = useSelector(
    (state) => state.mapReducer
  );
  return (
    <div className="carCard">
      <div className="imageContainer">
        <img className="carImg" src={details.img} alt="" />
      </div>
      <div className="details">
        <div>
          <p className="name">{details.model}</p>
          <p className="brand">{details.brand}</p>
          <p className="brand">
            Phí taxi:{" "}
            <span style={{ fontWeight: 600, fontSize: 15 }}>
              {details.charges}
            </span>{" "}
            {/* /- */}VNĐ
          </p>
          <p className="brand">
            Phí dự kiến:{" "}
            <span style={{ fontWeight: 600, fontSize: 15 }}>
              {(totalDistance * pricePerKm + details.charges).toFixed(1)}
            </span>{" "}
            {/* /- */}VNĐ
          </p>
        </div>
        <div className="tag">{details.type}</div>
      </div>
      <button
        className="btn"
        onClick={() => {
          setState(true);
          setSelectedBrand(details.model);
        }}
      >
        Đặt taxi
      </button>
    </div>
  );
}
