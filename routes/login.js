const express = require('express');
const Joi = require('joi');
const { User , sequelize, Sequelize} = require('../models');
const jwt = require('jsonwebtoken');
// const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware');

const router = express.Router();
require('dotenv').config();

const loginSchema = Joi.object({
    nickname: Joi.string().required(),
    
});

router.post('/', async (req, res) => {
    try {
        const { nickname } = await loginSchema.validateAsync(req.body);
        const user = await User.findOne({
            where: {
                nickname
            },
        });
        
        if (!user) {
            return res.status(412).send({
                errorMessage: '닉네임 확인해주세요.',
            });
        }

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 60);

        const token = jwt.sign({ authId: user.authId }, process.env.SECRET_KEY);

        res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
            expires: expires,
        });
        return res.status(200).json({ token });
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).send({
            errorMessage: '로그인에 실패하였습니다.',
        });
    }
});

module.exports = router;
