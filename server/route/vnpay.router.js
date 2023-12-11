const express = require("express");
const config = require("config");
const verifyAuth = require("../middleware/authorization/auth.validation.middleware");
const router = express.Router();
const bookingModel = require("../model/bookings.model");
const ticketModel = require("../model/tickets.model");
const flightModel = require("../model/flights.model");
const emailHelper = require("../helper/email.helper");
const validation = require("../helper/verify.helper");

/**
 * Created by CTT VNPAY
 */
let changeSeat = async (ticketObject) => {
  console.log(ticketObject);
  let flight = await flightModel.findById(ticketObject.flightId);
  for (let i = 0; i < flight?.cabinFuselage.length; i++) {
    if (flight.cabinFuselage[i].type == ticketObject.type) {
      for (let j = 0; j < flight.cabinFuselage[i].rows.length; j++) {
        for (let k = 0; k < flight.cabinFuselage[i].rows[j].seats.length; k++) {
          if (
            flight.cabinFuselage[i].rows[j].seats[k].id == ticketObject.seat
          ) {
            flight.cabinFuselage[i].rows[j].seats[k].occupied = true;
            await flightModel.update(flight._id, {
              cabinFuselage: flight.cabinFuselage,
            });
          }
        }
      }
    }
  }
};

let $ = require("jquery");
const request = require("request");
const moment = require("moment");

router.post("/create_payment_url", async (req, res, next) => {
  let ticketInfos;
  if (req.body.hasOwnProperty("ticketInfos")) {
    ticketInfos = req.body.ticketInfos;
  } //lấy riêng array ticketinfos
  if (!Array.isArray(ticketInfos)) {
    return res.status(400).json({ errors: ["Does not found any tickets"] });
  }
  let ticketObjects = [];
  try {
    let ticketPromises = ticketInfos.map((element) => {
      return ticketModel.create(element);
    });
    ticketObjects = await Promise.all(ticketPromises);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ errors: e });
  }
  req.body.tickets = [];
  req.body.totalPrice = 0;
  ticketObjects.forEach((element) => {
    changeSeat(element);
    req.body.tickets.push(element._id);
    req.body.totalPrice += element.price;
  });
  process.env.TZ = "Asia/Ho_Chi_Minh";
  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // let tmnCode = config.get("vnp_TmnCode");
  // let secretKey = config.get("vnp_HashSecret");
  // let vnpUrl = config.get("vnp_Url");
  // let returnUrl = config.get("vnp_ReturnUrl");
  let tmnCode = process.env.vnp_TmnCode;
  let secretKey = process.env.vnp_HashSecret;
  let vnpUrl = process.env.vnp_Url;
  let returnUrl = process.env.vnp_ReturnUrl;
  let orderId = moment(date).format("DDHHmmss");

  let amount =
    req.body.totalPrice < 1000
      ? req.body.totalPrice * 100
      : req.body.totalPrice;
  let bankCode = req.body.bankCode || "";

  let locale = req.body.language || "vn";
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  bookingModel
    .create(req.body)
    .then(async (result) => {
      //   let emailMessage = `<div style="font-family:sans-serif"><div class="adM">
      //   </div><table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" style="background:#e6eaed">
      //    <tbody>
      //     <tr>
      //      <td align="center">
      //       <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px">
      //        <tbody>
      //         <tr>
      //          <td align="center" style="padding-top:24px;padding-bottom:24px"> </td>
      //         </tr>
      //        </tbody>
      //       </table> </td>
      //     </tr>
      //     <tr>
      //      <td align="center">
      //       <table border="0" align="center" cellpadding="0" cellspacing="0" style="background:#fff;width:100%;max-width:600px">
      //        <tbody>
      //         <tr>
      //          <td>
      //           <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
      //            <tbody>
      //             <tr>
      //              <td style="background-image:url(https://ci3.googleusercontent.com/proxy/Uhu-caK7XEuaQmTA_ETdlAXJ4itsPtnZO6jD08nnkj33LtqIIKDCNiX3SJhFWXCGsE89Ggo-FuTHh_H_a-wAI5e9RWpGZfcCXq3MS7l0sbr8bm3DPImvogiBKCjvsnK32Ff6Je4t0Qr-zEf1UozVjWr6pcvFOK1wIR0P5gAJTNJBS62Ai02a_NRB3ERg=s0-d-e1-ft#https://d1gnmtcb0vp69g.cloudfront.net/imageResource/2021/01/28/1611827920940-d828ad41cd15a98d24597862fd09c177.jpeg?tr=q-75);background-repeat:repeat-x no-repeat;width:100%;height:4px;background-color:#259fd9;display:block"></td>
      //             </tr>
      //            </tbody>
      //           </table> </td>
      //         </tr>

      //         <tr>
      //          <td align="center" valign="top" style="background:#fff;padding-left:16px;padding-right:16px" width="100%">
      //           <table border="0" cellpadding="0" cellspacing="0" width="100%">
      //            <tbody>
      //             <tr>
      //              <td align="center" valign="top" style="padding-top:24px"> <h1 style="font-weight:normal;font-size:30px;color:#434343;margin:0px;padding:0px">Vé điện tử của quý khách trong thư này!</h1> </td>
      //             </tr>
      //             <tr>
      //              <td align="left" valign="top">
      //               <div style="width:100%;height:38px;display:block"></div> <h3 style="font-size:16px;margin:0px;padding:0px;color:#434343"> <strong>Kính gửi quý khách ${result.buyerName},</strong> </h3>
      //               <div style="width:100%;height:16px;display:block"></div> <p style="line-height:25px;font-size:16px;padding:0px;margin:0px"> Yêu cầu đặt vé của quý khách đã được xác nhận thành công, mã đặt chỗ của quý khách là <span style="color: blue;">${result.pnr}</span></p> </td>
      //             </tr>
      //             <tr>
      //              <td align="center" valign="top">

      //               <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:16px">
      //                <tbody>
      //                 <tr>
      //                  <td style="width:100%;background:#444444;height:0px"></td>
      //                 </tr>
      //                </tbody>
      //               </table> </td>
      //             </tr>
      //            </tbody>
      //           </table> </td>
      //         </tr>
      //         <tr>
      //          <td style="background-color:#e6eaed">
      //           <table style="Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%">
      //            <tbody>
      //             <tr style="padding:0;text-align:left;vertical-align:top">
      //              <td height="16px" style="Margin:0;border-collapse:collapse!important;color:#434343;font-size:16px;font-weight:normal;line-height:16px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"> &nbsp; </td>
      //             </tr>
      //            </tbody>
      //           </table> </td>
      //         </tr>
      //        </tbody>
      //       </table> </td>
      //     </tr>
      //    </tbody>
      //   </table>
      //   <img style="display:block;font-size:0px;line-height:0em" src="https://ci5.googleusercontent.com/proxy/cdw-MENhpV8AlrnT5wilQ84y-djlWqJlo1Y40enyGwtAepIbKqZ1n3IO5PEvpNTzcwV1jrExm7f2tV9dUGXp7GmWt-fV18hMeL6XNscX9uKo3OJQXMWrq75yptw=s0-d-e1-ft#https://messaging-callback-api.msg.traveloka.com/o?id=1697564480904392067" alt="" width="1" height="1" border="0" class="CToWUd"><div class="yj6qo"></div><div class="adL">
      //  </div>
      // </div>`;
      //   const email = result.email;
      //   if (validation.emailValidation(email)) {
      //     emailHelper.sendEmail(result.email, "Xác nhận đặt chỗ", emailMessage);
      //   }
      res.status(201).json({ result, vnpUrl });
      // console.log(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ errors: e });
    });
});

router.get("/vnpay_return", function (req, res, next) {
  let vnp_Params = req.query;

  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  // let tmnCode = config.get("vnp_TmnCode");
  // let secretKey = config.get("vnp_HashSecret");
  let tmnCode = process.env.vnp_TmnCode;
  let secretKey = process.env.vnp_HashSecret;

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    // Lấy trạng thái từ localStorage

    const paymentState = JSON.parse(localStorage.getItem("paymentState"));

    res
      .status(200)
      .json({ code: vnp_Params["vnp_ResponseCode"], paymentState });
  } else {
    res.status(500).json(("success", { code: "97" }));
  }
});

router.get("/vnpay_ipn", function (req, res, next) {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];

  let orderId = vnp_Params["vnp_TxnRef"];
  let rspCode = vnp_Params["vnp_ResponseCode"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  let secretKey = config.get("vnp_HashSecret");
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  let paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
  //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
  //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

  let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
  let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
  if (secureHash === signed) {
    //kiểm tra checksum
    if (checkOrderId) {
      if (checkAmount) {
        if (paymentStatus == "0") {
          //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
          if (rspCode == "00") {
            //thanh cong
            //paymentStatus = '1'
            // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn

            res.status(200).json({ RspCode: "00", Message: "Success" });
          } else {
            //that bai
            //paymentStatus = '2'
            // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
            res.status(200).json({ RspCode: "00", Message: "Success" });
          }
        } else {
          res.status(200).json({
            RspCode: "02",
            Message: "This order has been updated to the payment status",
          });
        }
      } else {
        res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
      }
    } else {
      res.status(200).json({ RspCode: "01", Message: "Order not found" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  }
});

// router.post("/querydr", function (req, res, next) {
//   process.env.TZ = "Asia/Ho_Chi_Minh";
//   let date = new Date();

//   let crypto = require("crypto");

//   let vnp_TmnCode = config.get("vnp_TmnCode");
//   let secretKey = config.get("vnp_HashSecret");
//   let vnp_Api = config.get("vnp_Api");

//   let vnp_TxnRef = req.body.orderId;
//   let vnp_TransactionDate = req.body.transDate;

//   let vnp_RequestId = moment(date).format("HHmmss");
//   let vnp_Version = "2.1.0";
//   let vnp_Command = "querydr";
//   let vnp_OrderInfo = "Truy van GD ma:" + vnp_TxnRef;

//   let vnp_IpAddr =
//     req.headers["x-forwarded-for"] ||
//     req.connection.remoteAddress ||
//     req.socket.remoteAddress ||
//     req.connection.socket.remoteAddress;

//   let currCode = "VND";
//   let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");

//   let data =
//     vnp_RequestId +
//     "|" +
//     vnp_Version +
//     "|" +
//     vnp_Command +
//     "|" +
//     vnp_TmnCode +
//     "|" +
//     vnp_TxnRef +
//     "|" +
//     vnp_TransactionDate +
//     "|" +
//     vnp_CreateDate +
//     "|" +
//     vnp_IpAddr +
//     "|" +
//     vnp_OrderInfo;

//   let hmac = crypto.createHmac("sha512", secretKey);
//   let vnp_SecureHash = hmac.update(new Buffer(data, "utf-8")).digest("hex");

//   let dataObj = {
//     vnp_RequestId: vnp_RequestId,
//     vnp_Version: vnp_Version,
//     vnp_Command: vnp_Command,
//     vnp_TmnCode: vnp_TmnCode,
//     vnp_TxnRef: vnp_TxnRef,
//     vnp_OrderInfo: vnp_OrderInfo,
//     vnp_TransactionDate: vnp_TransactionDate,
//     vnp_CreateDate: vnp_CreateDate,
//     vnp_IpAddr: vnp_IpAddr,
//     vnp_SecureHash: vnp_SecureHash,
//   };
//   // /merchant_webapi/api/transaction
//   request(
//     {
//       url: vnp_Api,
//       method: "POST",
//       json: true,
//       body: dataObj,
//     },
//     function (error, response, body) {
//       console.log(response);
//     }
//   );
// });

// router.post("/refund", function (req, res, next) {
//   process.env.TZ = "Asia/Ho_Chi_Minh";
//   let date = new Date();

//   let crypto = require("crypto");

//   let vnp_TmnCode = config.get("vnp_TmnCode");
//   let secretKey = config.get("vnp_HashSecret");
//   let vnp_Api = config.get("vnp_Api");

//   let vnp_TxnRef = req.body.orderId;
//   let vnp_TransactionDate = req.body.transDate;
//   let vnp_Amount = req.body.amount * 100;
//   console.log("vnp_Amount" + vnp_Amount);
//   let vnp_TransactionType = req.body.transType;
//   let vnp_CreateBy = req.body.user;

//   let currCode = "VND";

//   let vnp_RequestId = moment(date).format("HHmmss");
//   let vnp_Version = "2.1.0";
//   let vnp_Command = "refund";
//   let vnp_OrderInfo = "Hoan tien GD ma:" + vnp_TxnRef;

//   let vnp_IpAddr =
//     req.headers["x-forwarded-for"] ||
//     req.connection.remoteAddress ||
//     req.socket.remoteAddress ||
//     req.connection.socket.remoteAddress;

//   let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");

//   let vnp_TransactionNo = "0";

//   let data =
//     vnp_RequestId +
//     "|" +
//     vnp_Version +
//     "|" +
//     vnp_Command +
//     "|" +
//     vnp_TmnCode +
//     "|" +
//     vnp_TransactionType +
//     "|" +
//     vnp_TxnRef +
//     "|" +
//     vnp_Amount +
//     "|" +
//     vnp_TransactionNo +
//     "|" +
//     vnp_TransactionDate +
//     "|" +
//     vnp_CreateBy +
//     "|" +
//     vnp_CreateDate +
//     "|" +
//     vnp_IpAddr +
//     "|" +
//     vnp_OrderInfo;
//   let hmac = crypto.createHmac("sha512", secretKey);
//   let vnp_SecureHash = hmac.update(new Buffer(data, "utf-8")).digest("hex");

//   let dataObj = {
//     vnp_RequestId: vnp_RequestId,
//     vnp_Version: vnp_Version,
//     vnp_Command: vnp_Command,
//     vnp_TmnCode: vnp_TmnCode,
//     vnp_TransactionType: vnp_TransactionType,
//     vnp_TxnRef: vnp_TxnRef,
//     vnp_Amount: vnp_Amount,
//     vnp_TransactionNo: vnp_TransactionNo,
//     vnp_CreateBy: vnp_CreateBy,
//     vnp_OrderInfo: vnp_OrderInfo,
//     vnp_TransactionDate: vnp_TransactionDate,
//     vnp_CreateDate: vnp_CreateDate,
//     vnp_IpAddr: vnp_IpAddr,
//     vnp_SecureHash: vnp_SecureHash,
//   };

//   request(
//     {
//       url: vnp_Api,
//       method: "POST",
//       json: true,
//       body: dataObj,
//     },
//     function (error, response, body) {
//       console.log(response);
//     }
//   );
// });

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

module.exports = router;
