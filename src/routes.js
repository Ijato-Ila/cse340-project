import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    showEditOrganizationForm,
    processNewOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    showDashboard,
    showUsersPage,
    requireLogin,
    requireRole
} from './controllers/users.js';

import {
    processVolunteerSignup,
    processVolunteerRemoval
} from './controllers/volunteers.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);


router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', requireRole(2), showNewOrganizationForm);
router.post('/new-organization', requireRole(2), organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', requireRole(2), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole(2), organizationValidation, processEditOrganizationForm);


router.get('/projects', showProjectsPage);
router.get('/new-project', requireRole(2), showNewProjectForm);
router.post('/new-project', requireRole(2), projectValidation, processNewProjectForm);
router.get('/edit-project/:id', requireRole(2), showEditProjectForm);
router.post('/edit-project/:id', requireRole(2), projectValidation, processEditProjectForm);
router.get('/project/:id', showProjectDetailsPage);


router.get('/categories', showCategoriesPage);
router.get('/new-category', requireRole(2), showNewCategoryForm);
router.post('/new-category', requireRole(2), categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', requireRole(2), showEditCategoryForm);
router.post('/edit-category/:id', requireRole(2), categoryValidation, processEditCategoryForm);
router.get('/category/:id', showCategoryDetailsPage);


router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireRole(2), showUsersPage);


router.get('/volunteer/:projectId', requireLogin, processVolunteerSignup);
router.get('/remove-volunteer/:projectId', requireLogin, processVolunteerRemoval);


router.get('/test-route', (req, res) => {
    console.log('TEST ROUTE HIT');
    res.send('test route works');
});

router.get('/test-error', testErrorPage);

export default router;
