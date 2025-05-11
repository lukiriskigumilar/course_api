import express from 'express';
import courseCategoryController from '../../controllers/category_course/category_course_controller.js';

const router = express.Router();

router.post('/category_course', courseCategoryController.InsertCategoryCourse);
router.get('/category_course', courseCategoryController.getCategoryCourse);
router.get('/category_course/:id', courseCategoryController.getCategoryCourseById);

export default router;
