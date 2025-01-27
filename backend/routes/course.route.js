const Router = require("express")
const { addCourse } = require("../controllers/course.controller")
const { adminMiddleware } = require("../middlewares/admin.middleware")
const router = Router()

router.post("/add_course", adminMiddleware, addCourse)

module.exports = router