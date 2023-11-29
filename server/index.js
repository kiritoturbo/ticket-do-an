require("dotenv").config();
// require("@babel/core").transform("code", {
//   presets: ["@babel/preset-env"],
// });
const express = require("express");
const cors = require("cors");
const key = require("./config/main.config");
const authenticationRouter = require("./route/authentication.route");
const userRouter = require("./route/user.route");
const airportRouter = require("./route/airport.route");
const airlinerRouter = require("./route/airliner.route");
const flightRouter = require("./route/flight.route");
const ticketRouter = require("./route/ticket.route");
const bookingRouter = require("./route/booking.route");
const hotelsRoute = require("./route/hotels");
const roomRouter = require("./route/rooms");
const vnpay = require("./route/vnpay.router");
const userRoutes = require("./route/userRoutes");
const moment = require("moment-timezone");
const { port, mongoUrl, corsOrigin } = key;

const app = express();

require("./db").connectMongoDb(mongoUrl);
// Đặt múi giờ Hà Nội
moment.tz.setDefault("Asia/Ho_Chi_Minh");
var corsOption = {
  // origin: corsOrigin,
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.json({ success: true });
});
app.use("/", userRoutes);

app.use("/authentication", authenticationRouter);

app.use("/user", userRouter);

app.use("/airport", airportRouter);

app.use("/airliner", airlinerRouter);

app.use("/flight", flightRouter);

app.use("/ticket", ticketRouter);

app.use("/booking", bookingRouter);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomRouter);
app.use("/order", vnpay);

app.use(function (req, res) {
  res.status(404).json({ errors: ["Không tìm thấy route"] });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ errors: ["Lỗi máy chủ nội bộ"] });
});

app.listen(port, () => {
  console.log("Server is running at " + port);
});
