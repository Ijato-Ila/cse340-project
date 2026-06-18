import db from './db.js';

const addVolunteer = async (
    userId,
    projectId
) => {
    const query = `
        INSERT INTO volunteer
        (
            user_id,
            project_id
        )
        VALUES
        (
            $1,
            $2
        );
    `;

    await db.query(
        query,
        [
            userId,
            projectId
        ]
    );
};


const removeVolunteer = async (
    userId,
    projectId
) => {
    const query = `
        DELETE FROM volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

    await db.query(
        query,
        [
            userId,
            projectId
        ]
    );
};


const getVolunteerProjects = async (
    userId
) => {
    const query = `
        SELECT
            project.project_id,
            project.title,
            project.description,
            project.location,
            project.date
        FROM volunteer
        JOIN project
            ON volunteer.project_id =
               project.project_id
        WHERE volunteer.user_id = $1
        ORDER BY project.date;
    `;

    const result =
        await db.query(
            query,
            [userId]
        );

    return result.rows;
};


const isVolunteer = async (
    userId,
    projectId
) => {
    const query = `
        SELECT *
        FROM volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const result =
        await db.query(
            query,
            [
                userId,
                projectId
            ]
        );

    return result.rows.length > 0;
};


export {
    addVolunteer,
    removeVolunteer,
    getVolunteerProjects,
    isVolunteer
};
