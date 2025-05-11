import { customResponse } from '../../utils/custom_response.js';
import authService from '../../services/auth/auth_service.js';


const registerUserController = async (req, res) => {
    const data = req.body;
    try {
        const newUser = await authService.registerUserService(data);
        customResponse(res, 201, 'Registration successful! Please verify your email. The verification link is valid for 30 minutes', null);

    } catch (error) {
        const statusCode = error.message.includes('already exists') ? 400 : 500;
        customResponse(res, statusCode, 'Error registering user', error.message);

    }
}

export default {
    registerUserController
}