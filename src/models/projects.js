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

export { getAllProjects };