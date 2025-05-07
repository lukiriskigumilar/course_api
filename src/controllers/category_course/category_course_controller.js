const categoryCourse_service = require('../../services/category_course/category_course_service');
const { customResponse } = require('../../utils/custom_response');


const InsertCategoryCourse = async (req, res) => {
    try {
        const data = req.body;
        const result = await categoryCourse_service.insertCategoryCourse(data);
        const message = 'Category Course Created Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
}

const getCategoryCourse = async (req, res) => {
    try {
        const result = await categoryCourse_service.getCategoryCourse();
        const message = 'Category Course Retrieved Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
}

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
        }
        const message = 'Category Course Retrieved Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
}
module.exports = {
    InsertCategoryCourse,
    getCategoryCourse,
    getCategoryCourseById,
}