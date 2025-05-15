import { customResponse } from '../../utils/custom_response.js';
import authService from '../../services/auth/auth_service.js';


const registerUserController = async (req, res) => {
    const data = req.body;
    try {
        const newUser = await authService.registerUserService(data);
        await authService.sendVerificationEmailService(newUser.email, newUser.verification_token, newUser.name).catch((error) => {
            throw new Error('Failed to send verification email');
        });
        customResponse(res, 201, 'Registration successful! Please verify your email. The verification link is valid for 30 minutes', null);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        customResponse(res, statusCode, error.message || error.message, null);

    }
}

const verifyEmailController = async (req, res) => {
    const token = req.params.token;
    try {
        const result = await authService.verifyEmailService(token);
        customResponse(res, 200, 'Email verified successfully', null);
    } catch (error) {
        const statusCode = error.message.includes('Token expired') ? 400 : 500;
        customResponse(res, statusCode, 'Error verifying email', error.message);
    }
}

const requestVerificationEmailController = async (req,res) =>{

    const {email} = req.body;
    try {
       const user = await authService.resendVerificationEmailService(email);
        await authService.sendVerificationEmailService(user.email, user.verification_token, user.name).catch((error) => {
            throw new Error('Failed to send verification email', error.message);
        });
        customResponse(res, 200, 'Verification email sent successfully', null);
    } catch (error) {
        customResponse(res, 500, 'Error sending verification email', error.message);
    }
}


const loginUserController = async (req, res) => {
    const data = req.body;
    try {
        const result = await authService.loginUserService(data);
        if (result) {
            customResponse(res, 200, 'authentication successful', result);
        } else {
            customResponse(res, 401, 'Invalid email or password', null);
        }
    } catch (error) {
        const statusCode = error.statusCode || 500;
        customResponse(res, statusCode, error.message || 'login failed', null);
    }
}

export default {
    registerUserController,
    verifyEmailController,
    requestVerificationEmailController,
    loginUserController,
}