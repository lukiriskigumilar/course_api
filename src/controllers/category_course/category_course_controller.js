import categoryCourse_service from '../../services/category_course/category_course_service.js';
import { customResponse } from '../../utils/custom_response.js';

const InsertCategoryCourse = async (req, res) => {
    try {
        const data = req.body;
        const result = await categoryCourse_service.insertCategoryCourse(data);
        const message = 'Category Course Created Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
};

const getCategoryCourse = async (req, res) => {
    try {
        const result = await categoryCourse_service.getCategoryCourse();
        const message = 'Category Course Retrieved Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
};

const getCategoryCourseById = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            customResponse(res, 400, 'id must be insert', null);
            return;
        }
        const result = await categoryCourse_service.getCategoryCourseById(id);
        if (result.length === 0) {
            customResponse(res, 404, 'Category Course Not Found', null);
            return;
        }
        const message = 'Category Course Retrieved Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
};

export default {
    InsertCategoryCourse,
    getCategoryCourse,
    getCategoryCourseById,
};
