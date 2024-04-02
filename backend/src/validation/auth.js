const { check, validationResult }=require('express-validator');

exports.validateSignup = [
    check('firstName')
        .notEmpty()
        .withMessage('firstName is required'),
    check('lastName')
        .notEmpty()
        .withMessage('lastName is required'),
    check('email')
        .isEmail()
        .withMessage("Valid Email is required"),
    check('password')
        .isLength({min:8})
        .withMessage('Password must be at least 8 character lomg')
];

exports.validateSignin = [
    check('email')
        .isEmail()
        .withMessage("Email is required"),
    check('password')
        .isLength({min:8})
        .withMessage('Password must be at least 8 character lomg')
];

exports.isRequestValidated = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.array().length>0){
        return res.status(400).json({ 
            error: errors.array()[0].msg
        });
    }
    next();
}