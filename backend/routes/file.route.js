const Router = require("express")
const { fileUpload, fileDownload, fileList } = require("../controllers/file.controller")
const { adminMiddleware } = require("../middlewares/admin.middleware")
const router = Router()

router.post("/",adminMiddleware, fileUpload)
router.get("/download",fileDownload)
router.get("/",fileList)

module.exports = router