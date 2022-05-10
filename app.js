const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const path = require("path");

const homeRouter = require("./routes/home")

const app = express()

app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "hbs")

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
  session({
    key: "user_sid",
    secret: "super_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 2000000,
    }
  })
)

app.use("/", homeRouter)

module.exports = app;
