const express = require('express');
const {signup, signin, signout} = require('../../controller/admin/Auth');
const { validateSignup, validateSignin, isRequestValidated } = require('../../validation/auth');
const router = express.Router();


router.post('/admin/signin', validateSignin, isRequestValidated, signin);

router.post('/admin/signup', validateSignup, isRequestValidated, signup);

router.post('/admin/signout', signout)


module.exports = router;