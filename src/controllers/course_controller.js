const course_service = require('../services/course_service');
const { customResponse } = require('../utils/custom_response');


const insertCourse = async (req, res) =>{
    try {
        const data = req.body;
        const result = await course_service.insertCourse(data);
        const message = 'Course Created Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
}

const getCourses = async (req,res) =>{
    try {
        const result = await course_service.getCourses();
        if (!result || result.length === 0) {
            customResponse(res, 200, 'No course data available.', []);
            return;
        }
        const message = 'Course Retrieved Successfully';
        customResponse(res, 200, message, result);
     
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
}

const getCourseById = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            customResponse(res, 400, 'id must be insert', null);
            return;
        }
        const result = await course_service.getCourseById(id);
        if (result.length === 0) {
            customResponse(res, 404, 'Course Not Found', null);
            return;
        }
        const message = 'Course Retrieved Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
}

const patchCourse = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const result= await course_service.patchCourse(id, data);
        const affectedRows = result.result.affectedRows;
        console.log(affectedRows)
        if(affectedRows === 0) {
            customResponse(res, 404, 'Course Not Found', null);
            return;
        }
        const message = 'Course Updated Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
}

const hardDeleteCourse = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            customResponse(res, 400, 'id must be insert', null);
            return;
        }
        const result = await course_service.hardDeleteCourse(id);
        if (result.affectedRows === 0) {
            customResponse(res, 404, 'Course Not Found', null);
            return;
        }
        const message = 'Course Deleted Successfully';
        customResponse(res, 200, message, result);
    } catch (error) {
        customResponse(res, 500, 'Internal Server Error', error.message);
    }
}

const handleMissingCourseId = (req, res) => {
    customResponse(res, 400, 'id must be insert', null);
}



module.exports ={
    insertCourse,
    getCourses, 
    getCourseById, 
    hardDeleteCourse, 
    patchCourse,
    handleMissingCourseId 

}