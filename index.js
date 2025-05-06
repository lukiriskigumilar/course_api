const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const category_courseRoute = require('./src/routes/category_course_route');
app.use('/api', category_courseRoute);

const courseRoute = require('./src/routes/course_routes');
app.use('/api', courseRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

