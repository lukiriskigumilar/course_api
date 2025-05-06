const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');



const insertCourse = async (data) => {
    const idcourse = uuidv4();
    const {
        id_tutor,
        id_category,
        title,
        description,
        image_url,
        price,
        duration,
        language,
        included,
        avg_ratings,
        total_reviews,
    } = data;
    const query = 'INSERT INTO courses (id_course, id_tutor, id_category, title, description, image_url, price, duration, language, included, avg_rating, total_review) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [idcourse, id_tutor, id_category, title, description, image_url, price, duration, language, JSON.stringify(included), avg_ratings, total_reviews];
    const [result] = await db.query(query, values);
    return { idcourse, result };
}

const getCourses = async () => {
    const sql = "SELECT * FROM courses";
    const [result] = await db.query(sql);
    return result;
}

const getCourseById = async (id) => {
    const sql = 'SELECT * FROM courses WHERE id_course = ?';
    const values = [id];
    const [result] = await db.query(sql, values);
    return result;
}

const patchCourse = async (id, data) => {
    const fields = []
    const values = []

    for (const key in data) {
        if (key === 'included') {
            fields.push(`${key} = ?`)
            values.push(JSON.stringify(data[key]))
        }
        else {
            fields.push(`${key} = ?`)
            values.push(data[key])
        }
    }

    sql = `UPDATE courses SET ${fields.join(', ')} WHERE id_course = ?`;
    values.push(id)
    const [result] = await db.query(sql, values);
    return {id, result};
}

const hardDeleteCourse = async (id) => {
    const sql = 'DELETE FROM courses WHERE id_course = ?';
    const values = [id];
    const [result] = await db.query(sql, values);
    return result;
}





module.exports = {
    insertCourse,
    getCourses,
    getCourseById,
    hardDeleteCourse,
    patchCourse

}