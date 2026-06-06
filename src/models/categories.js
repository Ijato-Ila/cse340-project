import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM category;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0
        ? result.rows[0]
        : null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            category.category_id,
            category.name
        FROM category
        JOIN project
            ON category.category_id = project.category_id
        WHERE project.project_id = $1;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO category
        (
            name
        )
        VALUES
        (
            $1
        )
        RETURNING category_id;
    `;

    const queryParams = [name];

    const result = await db.query(
        query,
        queryParams
    );

    return result.rows[0].category_id;
};


const updateCategory = async (
    categoryId,
    name
) => {
    const query = `
        UPDATE category
        SET
            name = $1
        WHERE category_id = $2;
    `;

    const queryParams = [
        name,
        categoryId
    ];

    await db.query(
        query,
        queryParams
    );
};


export {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByProjectId,
    createCategory,
    updateCategory
};