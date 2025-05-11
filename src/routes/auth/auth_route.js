import express from 'express';
import authRoute from '../../controllers/auth/auth_controller.js';
import  validateRegister  from '../../middlewares/validate_register.js';
const router = express.Router();



router.post('/auth/register', validateRegister, authRoute.registerUserController);

export default router;
// router.post('/auth/login', loginUserController);