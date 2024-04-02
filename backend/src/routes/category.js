const express = require("express");
const { addCategory, getCategory, updateCategory, deleteCategory } = require("../controller/category");
const { requireSignin, adminMiddleware, superAdminMiddleware } = require("../middleware");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads/category'));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '.png');
    }
})

const upload = multer({ storage });

router.post(
    "/category/create",
    requireSignin,
    superAdminMiddleware,
    upload.single("categoryImage"),
    addCategory
);

router.get(
    "/category/get", 
    getCategory
);

router.post(
    "/category/update",
    requireSignin,
    superAdminMiddleware,
    upload.array("categoryImage"),
    updateCategory
);

router.post(
    "/category/delete",
    requireSignin,
    superAdminMiddleware,
    deleteCategory
);

//router.post("/category/update", requireSignin, superAdminMiddleware, upload.array("categoryImage"), updateCategory);
//router.post("/category/delete", requireSignin, superAdminMiddleware, deleteCategory);

module.exports = router;