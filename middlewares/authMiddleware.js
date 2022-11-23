// const jwt = require("jsonwebtoken");
// const { User } = require("../models");

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers["x-access-token"];
//     if (!token) {
//       throw new Error("로그인 후 사용해 주세요.");
//     }

//     const { userId } = jwt.verify(token, process.env.SECRET_KEY);
//     User.findOne({ where: { authId: userId } }).then((user) => {
//       res.locals.user = user;
//       next();
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// 유저 인증에 실패하면 403 상태 코드를 반환한다.
module.exports = async (req, res, next) => {
  try {
    const cookies = req.cookies[process.env.COOKIE_NAME];
    if (!cookies) {
      return res.status(403).send({
        errorMessage: '로그인이 필요한 기능입니다.',
      });
    }

    const [tokenType, tokenValue] = cookies.split(' ');
    if (tokenType !== 'Bearer') {
      return res.status(403).send({
        errorMessage: '전달된 쿠키에서 오류가 발생하였습니다.',
      });
    }
    
    const { authId } = jwt.verify(tokenValue, process.env.SECRET_KEY);
    const user = await User.findByPk(authId);
    res.locals.user = user;
    next();
    
  
  } catch (error) {
    return res.status(403).send({
      errorMessage: '로그인이 에러~.',
    });
  }
};
