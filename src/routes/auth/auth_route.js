import express from 'express';
import authRoute from '../../controllers/auth/auth_controller.js';
import  validateRegister  from '../../middlewares/validate_register.js';
import { validateBody } from '../../middlewares/validate_body.js';
import uploadSingleImage from '../../middlewares/validate_upload.js';
import { authenticationToken } from '../../middlewares/validate_auth_token.js';
const router = express.Router();



router.post('/auth/register',validateBody ,validateRegister, authRoute.registerUserController);
router.get('/auth/verify-email/:token', authRoute.verifyEmailController);
router.post('/auth/request_verification_email', validateBody, authRoute.requestVerificationEmailController);

router.post('/auth/login', validateBody, authRoute.loginUserController);

router.patch('/user/upload_image', authenticationToken,uploadSingleImage('profile_image'), authRoute.uploadProfileImageController);

export default router;
