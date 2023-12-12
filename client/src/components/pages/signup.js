import { useEffect, useState } from "react";
import "../car/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignupFlight() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErr] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [details, setDetails] = useState("");
  let enable = false;
  const navigation = useNavigate();
  const dispatch = useDispatch();

  if (email != "" && password != "") {
    enable = true;
  }
  // const validationSchema = Yup.object().shape({
  //   email: Yup.string().email('Invalid email').required('Email is required'),
  //   password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  // });
  const passCheck = (password) => {
    const emailRegex = /\S+@gmail\.com$/;
    if (!email || !password) {
      setErr("Không được để trống");
    } else if (!emailRegex.test(email)) {
      setErr("Email không hợp lệ, phải kết thúc bằng @gmail.com");
    } else if (password.length < 6) {
      setErr("Mật khẩu phải có 6 kí tự");
    } else {
      setErr("");
      dispatch(signupUser({ email, password }));
    }
    // if (email != "" && password != "") {
    //   if (password.length > 5) {
    //     setErr("");
    //     dispatch(signupUser({ email, password }));
    //   } else {
    //     setErr("password must be 8 characters long");
    //   }
    // } else {
    //   setErr("Fields cannot be empty");
    // }
  };

  const { msg, err } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (msg?.msg != undefined) {
      // setDetails(msg.);
      console.log(msg);
      setTimeout(() => {
        window.location.href = "/login";
        // navigation("/login");
      }, [2000]);
    } else {
      console.log(err);
      setDetails(err);
    }
  }, [msg?.msg, err, navigation]);

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
          <p className="head">Đăng ký</p>
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
            <label className="label">Password</label>
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
            Đăng ký
          </button>

          <Link to="/login" className="link">
            <span style={{ color: "black" }}>Bạn đã có tài khoản?</span> Đăng
            nhập
          </Link>
        </div>
      </div>
      <div className="sec color bgLoRe"></div>
    </div>
  );
}
