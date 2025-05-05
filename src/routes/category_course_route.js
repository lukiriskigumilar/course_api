const express = require('express');
const router = express.Router();
const courseCategoryController = require('../controllers/category_course_controller');

router.post('/category_course', courseCategoryController.InsertCategoryCourse);

module.exports = router;
