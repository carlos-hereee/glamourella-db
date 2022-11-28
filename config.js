const path = require("path");
const process = require("process");
const fs = require("fs");
const { v4 } = require("uuid");

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. In numquam molestias deserunt dolore consequuntur cum facere beatae eum nostrum, totam possimus reprehenderit, explicabo voluptate! Minus vero recusandae repellat voluptatibus enim.";

module.exports = {
  successMail: "could not send email",
  bookingNotFound:
    "This appointment was not found in calendar, pick a different appointment",
  bookMessage: "Appoinment was created successfully!",
  galleryEmpty: "Url path is empty and is required",
  notFound: "Not found",
  notFoundUser: "Couldn't find user with that uid",
  successfulLogout: "Bye, come back soon",
  errServer: "Server is down come back in a bit!",
  errMakeUser: "Couldn't create your account this moment, try again later",
  errCredentrial: "username or password are invalid",
  errMail: "could not send email",
  errLogout: "Unable to log out",
  errCalId: "missing calendar id in header",
  scopes: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ],
  dbUrl: process.env.DB_URL,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshSecret: process.env.REFRESH_TOKEN_SECRET,
  cookieName: process.env.COOKIE_NAME,
  clientUrl: process.env.CLIENT_URL,
  clientId: process.env.CLIENT_ID,
  keyfilePath: path.join(process.cwd(), "google-credentials.json"),
  tokenPath: path.join(process.cwd(), "token.json"),
  assetsPath: path.join(process.cwd(), "assets"),
  filePath: (name) => path.join(process.cwd(), `${name}`),
  readFolder: (path, folders, data) => {
    let filenames = fs.readdirSync(path);
    filenames.forEach((file) => {
      // if file has an extension its an assets
      const extension = file.split(".");
      const artistName =
        extension[0].includes("unsplash") && extension[0].split("-").join(" ");
      if (extension[1]) {
        const type = path.split("/");
        return data.push({
          uid: v4(),
          artistName,
          file,
          path: `${path}/${file}`,
          src: `${process.env.DB_URL}gallery/photo/?path=${path}/${file}`,
          cost: randomNum(10, 50),
          description: lorem,
          type: type[type.length - 1],
        });
        // else its a folder
      } else {
        folders.push(`${path}/${file}`);
      }
    });
  },
};
