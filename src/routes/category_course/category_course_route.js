const express = require('express');
const router = express.Router();
const courseCategoryController = require('../../controllers/category_course/category_course_controller');

router.post('/category_course', courseCategoryController.InsertCategoryCourse);
router.get('/category_course', courseCategoryController.getCategoryCourse);
router.get('/category_course/:id', courseCategoryController.getCategoryCourseById);

module.exports = router;
