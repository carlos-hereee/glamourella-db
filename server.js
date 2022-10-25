require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const contactRouter = require("./router/contactMe");
const calendarRouter = require("./router/calendar");
const bodyParser = require("body-parser");

// env
const port = process.env.PORT;
const uri = process.env.MONGOOSE_URI;
const clientURL = process.env.CLIENT_BASE_URL;
// set up express app
const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors({ credentials: true, origin: clientURL }));
app.use(express.json());
app.use("/contact-me", contactRouter);
app.use("/calendar", calendarRouter);

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
