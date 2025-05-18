import { insertCourse, getCourses, getCourseById, patchCourse, hardDeleteCourse } from '../../services/course/course_service.js';
import { customResponse } from '../../utils/custom_response.js';

const insertCourseController = async (req, res) => {
    try {
        const data = req.body;
        const result = await insertCourse(data);
        const message = 'Course Created Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
};

const getCoursesController = async (req, res) => {
    const query = req.query;
    try {
        const result = await getCourses(query);
        if (!result || result.length === 0) {
            customResponse(res, 404, 'No course data available.', null);
            return;
        }
        const message = 'Course Retrieved Successfully';
        customResponse(res, 200, message, result, result.length);

    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
};

const getCourseByIdController = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            customResponse(res, 400, 'id must be insert', null);
            return;
        }
        const result = await getCourseById(id);
        if (result.length === 0) {
            customResponse(res, 404, 'Course Not Found', null);
            return;
        }
        const message = 'Course Retrieved Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
};

const patchCourseController = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const result = await patchCourse(id, data);
        const affectedRows = result.result.affectedRows;
        if (affectedRows === 0) {
            customResponse(res, 404, 'Course Not Found', null);
            return;
        }
        const message = 'Course Updated Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
};

const hardDeleteCourseController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            customResponse(res, 400, 'id must be insert', null);
            return;
        }
        const result = await hardDeleteCourse(id);
        if (result.affectedRows === 0) {
            customResponse(res, 404, 'Course Not Found', null);
            return;
        }
        const message = 'Course Deleted Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
};

const handleMissingCourseId = (req, res) => {
    customResponse(res, 400, 'id must be insert', null);
};

export {
    insertCourseController,
    getCoursesController,
    getCourseByIdController,
    hardDeleteCourseController,
    patchCourseController,
    handleMissingCourseId
};
