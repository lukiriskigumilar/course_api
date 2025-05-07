const db = require('../../config/db');
const { v4: uuidv4 } = require('uuid');

const insertCategoryCourse = async (data) => {
    const id = uuidv4();
    const {name} = data;
    const query = 'INSERT INTO category_course ( id_category, name) VALUES (?, ?)';
    const values = [id, name];
    const [result] = await db.query(query, values);
    return{id, result};
}

const getCategoryCourse = async ( ) => {
    const query = 'SELECT * FROM category_course';
    const [result] = await db.query(query);
    return result;
}

const getCategoryCourseById = async (id) => {
    const query = 'SELECT * FROM category_course WHERE id_category = ?';
    const values = [id];
    const [result] = await db.query(query, values);
    return result;
}

module.exports = {
    getCategoryCourse,
    insertCategoryCourse,
    getCategoryCourseById
}

