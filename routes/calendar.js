const express = require("express");
const { CleanPlan } = require("../models");
const router = express.Router();
const { Op } = require("sequelize");
const authMiddleware = require("../middlewares/authMiddleware");


// 월간 달력 청소 조회
router.get("/", authMiddleware, async (req, res, next) => {
    try {
        const { authId } = res.locals.user;
        const calendarData = await CleanPlan.findAll({ attributes: ['date', 'category'], where: { authId } })
        if (!calendarData) {
            throw new Error("일정이 존재하지 않습니다")
        }
        res.status(200).json({ success: true, data: calendarData });
    }
    catch (error) {
        next(error);
    }
})

//주간 달력 청소 조회
router.get("/week", authMiddleware, async (req, res, next) => {
    try {
        const { authId } = res.locals.user;
        const { start, end } = req.query;
        const weekData = await CleanPlan.findAll({
            where: {
                authId,
                date: { [Op.between]: [start, end] },
            },
            attributes: ['date', 'category'],
            order: [['date', 'ASC']],
        })
        if (!weekData) {
            throw new Error("일정이 존재하지 않습니다")
        }
        res.status(200).json({ success: true, data: weekData });
    } catch (error) {
        next(error)
    }
})
// 요일별 청소 리스트
router.get("/list", authMiddleware, async (req, res, next) => {
    try {
        const { authId } = res.locals.user;
        const { date } = req.query;
        const listData = await CleanPlan.findAll({
            where: { authId, date },
            attributes: ['cleanPlanId', 'title'],
        })
        if (!listData) {
            throw new Error("일정이 존재하지 않습니다")
        }
        res.status(200).json({ success: true, data: listData });
    } catch (error) {
        next(error)
    }
})


module.exports = router;