const express = require("express");
const { CleanPlan } = require("../models");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");



//월간 달력 청소 조회
router.get("/", async (req, res, next) => {
    try {
        const { authId } = req.body;//res.locals.user
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
router.get("/week", async (req, res, next) => {
    try {
        const { authId } = req.body;//res.locals.user
        const weekData = await CleanPlan.findAll({
            where: { authId },
            attributes: ['date', 'category'],
            order: [['date', 'ASC']],
            limit: 7,
            offset: 1
        })
        if (!weekData) {
            throw new Error("일정이 존재하지 않습니다")
        }
        res.status(200).json({ success: true, data: weekData });

    } catch (error) {
        next(error)
    }
})

module.exports = router;