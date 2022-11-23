require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRouter = require("./src/router/user");
const contactRouter = require("./src/router/contactMe");
const calendarRouter = require("./src/router/calendar");
const galleryRouter = require("./src/router/gallery");
const servicesRouter = require("./src/router/services");
const glamourellaRouter = require("./src/router/glamourella");

// env
const port = process.env.PORT;
const uri = process.env.MONGOOSE_URI;
const clientURL = process.env.CLIENT_URL;
// set up express app
helmet({ crossOriginResourcePolicy: false });
const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static(__dirname + "/assets"));
app.use(cors({ credentials: true, origin: clientURL }));
app.use(express.json());
app.use("/users", userRouter);
app.use("/contact-me", contactRouter);
app.use("/services", servicesRouter);
app.use("/calendar", calendarRouter);
app.use("/gallery", galleryRouter);
app.use("/glamourella", glamourellaRouter);

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
