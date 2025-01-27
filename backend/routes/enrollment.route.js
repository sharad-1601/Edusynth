const Router = require("express")
const { enroll,listEnrolledUsers } = require("../controllers/enrollment.controller")
const { adminMiddleware } = require("../middlewares/admin.middleware")
const router = Router()

router.post("/", enroll)
router.get("/list", adminMiddleware, listEnrolledUsers)

module.exports = router