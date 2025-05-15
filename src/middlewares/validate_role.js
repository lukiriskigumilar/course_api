import { customResponse } from "../utils/custom_response.js";

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            return customResponse(res, 403, 'Access denied: insufficient role', null);
        }
        next();
    }
}

export {authorizeRole}