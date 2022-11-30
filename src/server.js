require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const userRouter = require("./router/user");
const contactRouter = require("./router/contactMe");
const calendarRouter = require("./router/calendar");
const galleryRouter = require("./router/gallery");
const glamourellaRouter = require("./router/glamourella");
const { uri, clientUrl, port } = require("../config");

// set up express app
const app = express();
const router = express.Router();
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static(__dirname + "/assets"));
app.use(cors({ credentials: true, origin: clientUrl }));
app.use(express.json());
helmet({ crossOriginResourcePolicy: false });
// custom routes
app.use("/users", userRouter);
app.use("/contact-me", contactRouter);
app.use("/calendar", calendarRouter);
app.use("/gallery", galleryRouter);
app.use("/glamourella", glamourellaRouter);
// netlify confi
app.use("/.netlify/functions/server", router);
// starter router
app.get("/", (req, res) => {
  res.status(200).json({ message: "api is running" });
});

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      if (process.env.NODE_ENV === "development") {
        console.log(`\n *** Server listening on port ${port} *** \n`);
      }
    });
  })
  .catch((e) => {
    if (process.env.NODE_ENV === "development") console.log("e", e);
  });

module.exports.handler = serverless(app);
