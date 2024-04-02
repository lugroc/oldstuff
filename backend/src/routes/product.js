const express = require('express');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const {adminMiddleware, requireSignin} = require('../middleware/index');
const {createProduct} = require('../controller/product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads/product'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '.png')
    }
})

const upload = multer({ storage });

router.post(
    '/product/create',
    requireSignin,
    adminMiddleware,
    upload.array('productPictures'),
    createProduct
);


module.exports = router;