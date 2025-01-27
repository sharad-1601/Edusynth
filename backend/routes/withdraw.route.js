const {Router} = require ("express")
const { courseWithdraw, courseWithdrawDecline, listPendingWithdrawals, courseDrop } = require("../controllers/withdraw.controller")
const { adminMiddleware } = require("../middlewares/admin.middleware")
const router = Router()

router.post("/",courseWithdraw)
router.get("/list", adminMiddleware, listPendingWithdrawals)
router.post("/approve", adminMiddleware, courseDrop)
router.post("/decline", adminMiddleware, courseWithdrawDecline)

module.exports = router