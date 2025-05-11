import express from 'express';
import { insertCourseController, getCoursesController, getCourseByIdController, patchCourseController, hardDeleteCourseController, handleMissingCourseId }
 from '../../controllers/course/course_controller.js';

const router = express.Router();

router.post('/courses', insertCourseController);

router.get('/courses', getCoursesController);
router.get('/courses/:id', getCourseByIdController);

router.patch('/courses', handleMissingCourseId);
router.patch('/courses/:id', patchCourseController);

router.delete('/courses', handleMissingCourseId);
router.delete('/courses/:id', hardDeleteCourseController);

export default router;
