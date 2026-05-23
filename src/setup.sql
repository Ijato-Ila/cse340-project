
-- Organization Table

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- Category Table

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


-- Project Table

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    organization_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id),
    FOREIGN KEY (category_id)
        REFERENCES category (category_id)
);


-- Insert Organizations

INSERT INTO organization
(name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);


-- Insert Categories

IINSERT INTO category (name)
VALUES
('Community Service'),
('Environmental'),
('Education');


-- Insert Projects

INSERT INTO project
(title, description, location, organization_id, category_id)
VALUES
(
    'Neighborhood Cleanup',
    'Volunteers help clean parks and streets.',
    'Portland',
    1,
    1
),
(
    'Community Garden Build',
    'Building urban gardens for local food production.',
    'Seattle',
    2,
    2
),
(
    'After School Tutoring',
    'Helping students with homework and mentoring.',
    'Boise',
    3,
    3
);
