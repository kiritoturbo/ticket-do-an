import { useEffect, useState } from "react";
import "../car/auth.css";
import { Link } from "react-router-dom";
import { signinUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

export default function LoginFlight() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErr] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [details, setDetails] = useState("");
  let enable = false;

  const dispatch = useDispatch();
  const { msg, err } = useSelector((state) => state.authReducer);

  if (email !== "" && password !== "") {
    enable = true;
  }

  const passCheck = () => {
    if (email !== "" && password !== "") {
      setErr("");
      dispatch(signinUser({ email, password }));
    } else {
      setErr("Fields cannot be empty");
    }
  };

  useEffect(() => {
    if (msg !== undefined) {
      setDetails(msg);
      setTimeout(() => {
        window.location.href = "/";
      }, [2000]);
    } else {
      setDetails(err);
    }
  }, [msg, err]);

  return (
    <div className="registerContainer">
      <div className="sec">
        <div className="msg">{details}</div>
        <Link to="/">
          <div className="back">
            <ion-icon
              name="arrow-back-outline"
              style={{ fontSize: 30, color: "rgb(128, 128, 128)" }}
            ></ion-icon>
          </div>
        </Link>
        <div className="innersection">
          <p className="head">Đăng nhập</p>
          <p className="sub"></p>
          <div className="inputContainer">
            <label className="label">Email</label>
            <input
              className="inp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="something@example.com"
            />
          </div>
          <div className="inputContainer">
            <label className="label">Mật khẩu</label>
            <div className="inputBox">
              <input
                className="inp"
                value={password}
                type={showPass ? "password" : "type"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="xxxxxxxxx"
              />
              <div className="icon" onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <ion-icon
                    name="eye-outline"
                    style={{ fontSize: 30, color: "rgb(177, 177, 177)" }}
                  ></ion-icon>
                ) : (
                  <ion-icon
                    name="eye-off-outline"
                    style={{ fontSize: 30, color: "rgb(177, 177, 177)" }}
                  ></ion-icon>
                )}
              </div>
            </div>
            <p className="err">{errmsg}</p>
          </div>
          <button
            onClick={() => passCheck(password)}
            data-state={enable}
            className="btn"
          >
            Đăng nhập
          </button>

          <Link to="/register" className="link">
            <span style={{ color: "black" }}>Bạn chưa có tài khoản?</span> Đăng
            ký ngay
          </Link>
        </div>
      </div>
      <div className="sec color bgLoRe"></div>
    </div>
  );
}
