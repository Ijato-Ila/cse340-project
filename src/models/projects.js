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

export {
    getAllProjects,
    getProjectsByOrganizationId,
    getProjectsByCategoryId,
    getProjectDetails
};