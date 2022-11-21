const express = require("express");
const { CleanPlan } = require("../models");
const router = express.Router();
const { Op } = require("sequelize");
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
        const { start, end } = req.query;
        const weekData = await CleanPlan.findAll({
            where: {
                authId,
                date: { [Op.gte]: start, [Op.lte]: end },
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

// //월간 달력 청소 조회
// router.get("/:title", async (req, res, next) => {
//     try {
//         // const { authId } = req.body;//res.locals.user
//         const { title } = req.params
//         const calendarData = await CleanPlan.findAll({ attributes: ['date', 'category'], where: { title } })
//         if (!calendarData) {
//             throw new Error("일정이 존재하지 않습니다")
//         }
//         res.status(200).json({ success: true, data: calendarData });
//     }
//     catch (error) {
//         next(error);
//     }
// })

// //주간 달력 청소 조회
// router.get("/:title/week", async (req, res, next) => {
//     try {
//         // const { authId } = req.body;//res.locals.user
//         const { start, end } = req.query;
//         const { title } = req.params;
//         console.log(start)
//         const weekData = await CleanPlan.findAll({
//             where: {
//                 title,
//                 date: { [Op.gte]: start, [Op.lte]: end },
//             },
//             attributes: ['date', 'category'],
//             order: [['date', 'ASC']],

//         })
//         if (!weekData) {
//             throw new Error("일정이 존재하지 않습니다")
//         }
//         res.status(200).json({ success: true, data: weekData });

//     } catch (error) {
//         next(error)
//     }
// })


module.exports = router;