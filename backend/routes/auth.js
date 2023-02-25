const express = require("express");
const router = express.Router();
const {signup,signin,signout} = require("../controllers/auth");
const { check } = require('express-validator');

router.post("/signup",

    check('name').isLength({ min: 3 })
    .withMessage('name must be at least 5 chars long'),

    check('email').isEmail()
    .withMessage('email is required'),

    check('password').isLength({min:8 })
    .withMessage('password should be atleast 8 chars long'),

    signup
);
router.post("/signin",

    check('email').isEmail()
    .withMessage('email is required'),

    check('password').isLength({min:8 })
    .withMessage('password should be atleast 8 chars long'),

    signin
);
router.get("/signout",signout);

module.exports = router;