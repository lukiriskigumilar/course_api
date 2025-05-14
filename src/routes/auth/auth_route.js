import express from 'express';
import authRoute from '../../controllers/auth/auth_controller.js';
import  validateRegister  from '../../middlewares/validate_register.js';
import { validateBody } from '../../middlewares/validate_body.js';
const router = express.Router();



router.post('/auth/register',validateBody ,validateRegister, authRoute.registerUserController);
router.get('/auth/verify-email/:token', authRoute.verifyEmailController);
router.post('/auth/request_verification_email', validateBody, authRoute.requestVerificationEmailController);

router.post('/auth/login', validateBody, authRoute.loginUserController);


export default router;
