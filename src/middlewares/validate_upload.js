import multer from "multer";

import { customResponse } from '../utils/custom_response.js';
const storage = multer.memoryStorage();
const upload =  multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }else{
            cb(new Error('Only image files are allowed'));
        }
    }
}); 

const uploadSingleImage = (fieldName) => [
    (req, res, next) => {
        upload.single(fieldName)(req, res, function (err) {
            if (err) {
                return customResponse(res, 400, err.message, null);
            }
            next();
        });
    },
    (req, res, next) =>{
        if(!req.file){
            return customResponse(res, 400, 'Plese provide image', null);
        }
        next();
    }
] 

export default uploadSingleImage;