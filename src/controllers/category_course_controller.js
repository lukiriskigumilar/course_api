const unitService = require('../services/category_course_service');
const {customResponse} = require('../utils/custom_response');


const InsertCategoryCourse = async (req, res) => {
    try {
        const data = req.body;
        const result = await unitService.insertCategoryCourse(data);
        const message = 'Category Course Created Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
}

module.exports = {
   InsertCategoryCourse
}