import nodemailer from "nodemailer";
// console.log(mailUser);

const SendMail = async (toEmail, Subject, content) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_SERVER_USER,
    to: toEmail,
    subject: Subject,
    text: content,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
};

export default SendMail;
