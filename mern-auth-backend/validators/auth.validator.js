const {body} = require('express-validator');

const signupValidator=[
    body("name")
    .trim()
    .notEmpty().withMessage("Name is Required")
    .isLength({min:2}).withMessage("Name must be at least 2 characters long"),

    body("email")
    .isEmail().withMessage("Valid Email is Required")
    .normalizeEmail(),

    body("password")
    .isLength({min:8}).withMessage("Password must be at least 8 characters long")
     .matches(/[A-Z]/).withMessage("Password must contain one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain one number"),

    body("role")
    .optional()
    .isIn(["manager","employee"]).withMessage("Role must be either manager or employee"),
]

const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];


module.exports={signupValidator,loginValidator};

