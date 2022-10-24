require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

// env
const port = process.env.PORT;
const uri = process.env.MONGOOSE_URI;
const clientURL = process.env.CLIENT_BASE_URL;
// set up express app
const app = express();
const server = createServer(app);
app.use(helmet());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: clientURL }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "api is running" });
});

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(port, () => {
      if (process.env.NODE_ENV === "development") {
        console.log(`\n *** Server listening on port ${port} *** \n`);
      }
    });
  })
  .catch((e) => {
    if (process.env.NODE_ENV === "development") console.log("e", e);
  });
