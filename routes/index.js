var express = require("express");
var router = express.Router();

const naverRouter = require("./naver");
const kakaoRouter = require("./kakao");
const cleanPlan = require("./cleanPlan");
const calendar = require("./calendar");
const signup = require("./signup");
const login = require("./login");

router.get("/", (req, res) => {
  res.status(200).json({ massage: "서버 정상" });
});

router.use("/kakao", kakaoRouter);
router.use("/naver", naverRouter);
router.use("/cleanPlan", cleanPlan);
router.use("/calendar", calendar);
router.use("/signup" , signup);
router.use("/login" , login);

module.exports = router;
