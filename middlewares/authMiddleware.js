const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw new Error("로그인 후 사용해 주세요.");
    }

    const { userId } = jwt.verify(token, process.env.secretKey);
    User.findOne({ where: { authId: userId } }).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};
