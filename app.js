const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const path = require("path");

const homeRouter = require("./routes/home");
const usersRouter = require("./routes/users"); 
const sessionsRouter = require("./routes/sessions")
const addFriendRouter = require("./routes/addfriend")

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

app.use((req, res, next) => {
  res.locals.user = req.session.user
  next()
})

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.cookies.user_sid) {
    res.redirect("/sessions/new")
  } else {
    next()
  }
})

// route setup
app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/sessions", sessionsRouter)
app.use("/addfriend", addFriendRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
