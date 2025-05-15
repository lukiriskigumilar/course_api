import express from 'express';
import { authenticationToken } from '../../middlewares/validate_auth_token.js';
import { authorizeRole } from '../../middlewares/validate_role.js'; 
import { insertCourseController, getCoursesController, getCourseByIdController, patchCourseController, hardDeleteCourseController, handleMissingCourseId }
 from '../../controllers/course/course_controller.js';

const router = express.Router();

router.post('/courses', authenticationToken,authorizeRole("administrator"), insertCourseController);

router.get('/courses', authenticationToken, authorizeRole("administrator","student"), getCoursesController);
router.get('/courses/:id',authenticationToken, authorizeRole("administrator","student"), getCourseByIdController);

router.patch('/courses/:id',authenticationToken, authorizeRole("administrator"), patchCourseController);

router.delete('/courses/:id',authenticationToken, authorizeRole("administrator"), hardDeleteCourseController);

export default router;
