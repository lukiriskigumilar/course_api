const express = require('express');
const router = express.Router();
const course_controller= require('../controllers/course_controller');

router.post('/courses', course_controller.insertCourse);

router.get('/courses', course_controller.getCourses);
router.get('/courses/:id', course_controller.getCourseById);

router.patch('/courses/', course_controller.handleMissingCourseId);
router.patch('/courses/:id', course_controller.patchCourse);

router.delete('/courses', course_controller.handleMissingCourseId);
router.delete('/courses/:id', course_controller.hardDeleteCourse);


module.exports = router;
