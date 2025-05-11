import {body, validationResult} from 'express-validator';
 const validateRegister = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({min: 3})
        .withMessage('Name must be at least 3 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),
    body('confirmPassword')
        .notEmpty()
        .withMessage('Confirm Password is required')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
];

export default validateRegister;