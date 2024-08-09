const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const indexroute = require("./routes/index");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./middlewares/passport-middleware");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:5173", // Allow only this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexroute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
