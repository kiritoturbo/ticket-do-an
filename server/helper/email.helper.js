const nodemailer = require("nodemailer");
const config = require("../config/main.config");
const { error } = require("jquery");

module.exports.sendEmail = async (receiver, subject, body, pdfBuffer) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.email.account, // generated ethereal user
        pass: config.email.pass, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: '"Truong Travel" <foo@example.com>', // sender address
      to: receiver, // list of receivers
      subject: subject, // Subject line
      text: "Đây là nội dung email kiểu văn bản.", // plain text body
      html: body, // html body
      attachments: [
        {
          filename: "Ve-dat.pdf",
          content: pdfBuffer,
          encoding: "base64",
          contentType: "application/pdf",
        },
      ],
    });
    console.log("Message sent: %s", info.accepted);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);

    // Thêm thông báo hoặc xử lý lỗi ở đây
    throw new Error("Error sending email");
  }
};
