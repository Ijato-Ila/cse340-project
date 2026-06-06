import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            project.project_id,
            project.title,
            project.description,
            project.location,
            organization.name AS organization_name,
            category.name AS category_name
        FROM project
        JOIN organization
            ON project.organization_id = organization.organization_id
        JOIN category
            ON project.category_id = category.category_id;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            project_id,
            category_id,
            title,
            description,
            location,
            date
        FROM project
        WHERE category_id = $1
        ORDER BY date;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (projectId) => {
    const query = `
        SELECT
            project.project_id,
            project.title,
            project.description,
            project.location,
            project.date,
            project.organization_id,
            project.category_id,
            organization.name AS organization_name
        FROM project
        JOIN organization
            ON project.organization_id = organization.organization_id
        WHERE project.project_id = $1;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0
        ? result.rows[0]
        : null;
};


const createProject = async (
    title,
    description,
    location,
    date,
    organizationId,
    categoryId
) => {
    const query = `
        INSERT INTO project
        (
            title,
            description,
            location,
            date,
            organization_id,
            category_id
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        )
        RETURNING project_id;
    `;

    const queryParams = [
        title,
        description,
        location,
        date,
        organizationId,
        categoryId
    ];

    const result = await db.query(
        query,
        queryParams
    );

    return result.rows[0].project_id;
};


const updateProject = async (
    projectId,
    title,
    description,
    location,
    date,
    organizationId,
    categoryId
) => {
    const query = `
        UPDATE project
        SET
            title = $1,
            description = $2,
            location = $3,
            date = $4,
            organization_id = $5,
            category_id = $6
        WHERE project_id = $7;
    `;

    const queryParams = [
        title,
        description,
        location,
        date,
        organizationId,
        categoryId,
        projectId
    ];

    await db.query(
        query,
        queryParams
    );
};


export {
    getAllProjects,
    getProjectsByOrganizationId,
    getProjectsByCategoryId,
    getProjectDetails,
    createProject,
    updateProject
};