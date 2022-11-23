const express = require("express");
const { CleanPlan } = require("../models");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// 일정 작성 [POST] /cleanPlan
router.post("/",authMiddleware, async (req, res, next) => {
  
  try {
    // 사용자 인증 미들웨어 authMiddleware 추가하고 authId는 res.locals.user로 바꾸기
    const { authId } = res.locals.user;
    const { date, category, title, notification, detail } = req.body;

    const data = await CleanPlan.create({
      authId,
      date,
      category,
      title,
      notification,
      detail,
    }); 
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// 일정 수정 [PUT] /cleanPlan/:cleanPlanId
router.put("/:cleanPlanId",authMiddleware, async (req, res, next) => {
  try {
    // 사용자 인증 미들웨어 authMiddleware 추가하고 authId는 res.locals.user로 바꾸기
    const { authId } = res.locals.user;
    const { date, category, title, notification, detail } = req.body;
    const { cleanPlanId } = req.params;

    const cleanPlanData = await CleanPlan.findOne({ where: { cleanPlanId } });
    if (!cleanPlanData) {
      throw new Error("일정이 존재하지 않습니다.");
    }
    if (cleanPlanData.authId !== authId) {
      throw new Error("본인 일정만 수정 가능합니다.");
    }

    const data = await CleanPlan.update(
      {
        authId,
        date,
        category,
        title,
        notification,
        detail,
      },
      { where: { cleanPlanId } }
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// 일정 삭제 [DELETE] /cleanPlan/:cleanPlanId
router.delete("/:cleanPlanId",authMiddleware, async (req, res, next) => {
  try {
    // 사용자 인증 미들웨어 authMiddleware 추가하고 authId는 res.locals.user로 바꾸기
    const { authId } = res.locals.user;
    const { cleanPlanId } = req.params;

    const cleanPlanData = await CleanPlan.findOne({ where: { cleanPlanId } });
    if (!cleanPlanData) {
      throw new Error("일정이 존재하지 않습니다.");
    }
    if (cleanPlanData.authId !== authId) {
      throw new Error("본인 일정만 삭제 가능합니다.");
    }

    await CleanPlan.destroy({ where: { cleanPlanId } });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

// 청소 상세 조회 [GET] /cleanPlan/:cleanPlanId
router.get("/:cleanPlanId",authMiddleware, async (req, res, next) => {
  try {
    // 사용자 인증 미들웨어 authMiddleware 추가하고 authId는 res.locals.user로 바꾸기
    const { authId } = res.locals.user;
    const { cleanPlanId } = req.params;

    const cleanPlanData = await CleanPlan.findOne({ where: { cleanPlanId } });

    if (!cleanPlanData) {
      throw new Error("일정이 존재하지 않습니다.");
    }
    if (cleanPlanData.authId !== authId) {
      throw new Error("본인 일정만 조회 가능합니다.");
    }

    res.status(200).json({ success: true, data: cleanPlanData });
  } catch (error) {
    next(error);
  }
});



// 일정 완료/취소 [PUT] /cleanPlan/:cleanPlanId/completed
router.put("/:cleanPlanId/completed",authMiddleware, async (req, res, next) => {
  try {
    // 사용자 인증 미들웨어 authMiddleware 추가하고 authId는 res.locals.user로 바꾸기
    const { authId } = res.locals.user;
    const { cleanPlanId } = req.params;

    const cleanPlanData = await CleanPlan.findOne({ where: { cleanPlanId } });
    if (!cleanPlanData) {
      throw new Error("일정이 존재하지 않습니다.");
    }
    if (cleanPlanData.authId !== authId) {
      throw new Error("본인 일정만 완료 및 취소 가능합니다.");
    }

    await CleanPlan.update(
      { isCompleted: cleanPlanData.isCompleted ? false : true },
      { where: { cleanPlanId } }
    );

    res
      .status(200)
      .json({ success: true, isCompleted: !cleanPlanData.isCompleted });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
