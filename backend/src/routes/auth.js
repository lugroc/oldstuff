const express = require('express');
const {signup, signin} = require('../controller/Auth');
const { validateSignup, validateSignin, isRequestValidated } = require('../validation/auth');
const router = express.Router();


router.post(
    '/signin', 
    validateSignin, 
    isRequestValidated, 
    signin
);

router.post(
    '/signup',
    validateSignup,
    isRequestValidated,
    signup
);


 

module.exports = router;