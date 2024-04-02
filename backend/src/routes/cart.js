const express = require('express');
const router = express.Router();
const {addItem, getCart, updateCart, removeItem} = require('../controller/cart');
const {userMiddleware, requireSignin} = require('../middleware/index');


router.post(
    '/user/cart/add', 
    requireSignin, 
    userMiddleware, 
    addItem
);

router.get(
    '/user/cart/get', 
    getCart
);

//router.post("/cart/update", requireSignin, superuserMiddleware, upload.array("cartImage"), updateCategory);
//router.post("/cart/remove", requireSignin, superuserMiddleware, deleteCategory);

module.exports = router;