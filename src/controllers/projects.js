import {
  body,
  validationResult
} from 'express-validator';

import {
  getAllProjects,
  getProjectDetails,
  createProject,
  updateProject
} from '../models/projects.js';

import {
  getCategoriesByProjectId,
  getAllCategories
} from '../models/categories.js';

import {
  getAllOrganizations
} from '../models/organizations.js';

const projectValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Project title is required')
    .isLength({
      min: 3,
      max: 150
    })
    .withMessage(
      'Project title must be between 3 and 150 characters'
    ),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Project description is required'),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Project location is required'),

  body('organizationId')
    .notEmpty()
    .withMessage('Organization is required'),

  body('categoryId')
    .notEmpty()
    .withMessage('Category is required')
];

const showProjectsPage = async (req, res) => {
  const projects = await getAllProjects();

  const title = 'Service Projects';

  res.render('projects', {
    title,
    projects
  });
};

const showProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;

  const projectDetails =
    await getProjectDetails(projectId);

  const categories =
    await getCategoriesByProjectId(projectId);

  const title = 'Project Details';

  res.render('project', {
    title,
    projectDetails,
    categories
  });
};

const showNewProjectForm = async (req, res) => {
  const organizations =
    await getAllOrganizations();

  const categories =
    await getAllCategories();

  const title = 'Add New Project';

  res.render('new-project', {
    title,
    organizations,
    categories
  });
};

const showEditProjectForm = async (req, res) => {
  const projectId = req.params.id;

  const projectDetails =
    await getProjectDetails(projectId);

  const organizations =
    await getAllOrganizations();

  const categories =
    await getAllCategories();

  const title = 'Edit Project';

  res.render('edit-project', {
    title,
    projectDetails,
    organizations,
    categories
  });
};

const processNewProjectForm = async (req, res) => {
  const results = validationResult(req);

  if (!results.isEmpty()) {
    req.flash(
      'error',
      results.array()[0].msg
    );

    return res.redirect(
      '/new-project'
    );
  }

  const {
    title,
    description,
    location,
    date,
    organizationId,
    categoryId
  } = req.body;

  const projectId =
    await createProject(
      title,
      description,
      location,
      date,
      organizationId,
      categoryId
    );

  req.flash(
    'success',
    'Project created successfully.'
  );

  res.redirect(
    `/project/${projectId}`
  );
};

const processEditProjectForm = async (req, res) => {
  const results = validationResult(req);

  if (!results.isEmpty()) {
    req.flash(
      'error',
      results.array()[0].msg
    );

    return res.redirect(
      `/edit-project/${req.params.id}`
    );
  }

  const projectId = req.params.id;

  const {
    title,
    description,
    location,
    date,
    organizationId,
    categoryId
  } = req.body;

  await updateProject(
    projectId,
    title,
    description,
    location,
    date,
    organizationId,
    categoryId
  );

  req.flash(
    'success',
    'Project updated successfully.'
  );

  res.redirect(
    `/project/${projectId}`
  );
};

export {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm,
  projectValidation
};