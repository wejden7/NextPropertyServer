import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILE_USER,
    pass: process.env.MAILE_PASS,
  },
});

export default async (email, html) => {
  const options = {
    from: `TecPro <restaurant.dev.723@gmail.com>`,
    to: email,
    subject: "Reset your password",
    html: html,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, function (err, mail) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(mail);
      return resolve();
    });
  });
};
