import express from 'express';
import dotenv from 'dotenv';
import category_courseRoute from './src/routes/category_course/category_course_route.js';
import courseRoute from './src/routes/course/course_routes.js';
import authRoute from './src/routes/auth/auth_route.js';

// Konfigurasi dotenv
dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api', category_courseRoute);
app.use('/api', courseRoute);
app.use('/api', authRoute);

// Menjalankan server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
