const { check, validationResult } = require('express-validator');

const validateSignup = [
    check('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required'),

    check('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required'),

    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),


    check('phone')
        .optional({ checkFalsy: true }) // Agar field khali ho to skip kar do
        .trim()
        .isLength({ min: 10, max: 15 })
        .withMessage('Please enter a valid phone number (10-15 digits)')
        .matches(/^\d+$/)
        .withMessage('Phone number must contain only numbers'),

    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg
            });
        }
        next();
    }
];

const validateLogin = [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),

    check('password')
        .notEmpty()
        .withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 1. Server-side log (Backend terminal mein dikhega)
            console.error(`❌ VALIDATION ERROR:`, errors.array());

            // 2. Client-side response (Frontend ko error message milega)
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg
            });
        }
        next();
    }
];

module.exports = { validateSignup, validateLogin };