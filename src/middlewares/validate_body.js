import { customResponse } from "../utils/custom_response.js";
export const validateBody = (req,res,next) => {
    if(req.body === undefined || Object.keys(req.body).length === 0){
        return customResponse(res, 400, 'Request body is required', null);
    }
    next();
}