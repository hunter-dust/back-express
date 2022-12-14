const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const kakaoPassport = require("./passport/kakaoStrategy");
const naverPassport = require("./passport/naverStrategy");
const indexRouter = require("./routes/index");

const app = express();
kakaoPassport(app);
naverPassport(app);

const { sequelize } = require("./models/index");
sequelize
  .sync({ force:false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((error) => {
    console.log(`데이터베이스 연결 실패 ${error}`);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: ["http://localhost:3000", "http://3.34.125.88"], credentials: true }));
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({ errorMessage: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`);
});

module.exports = app;
