const nodemailer = require("nodemailer");


exports.sendMail = async (receiver, subject, text, html) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "a9f00e76121237",
      pass: "1586bde86aca43"
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Node Mailer" <node@mailer.com>', // sender address
    to: receiver, 
    subject, 
    text, 
    html, 
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}