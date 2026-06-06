import {
    body,
    validationResult
} from 'express-validator';

import {
    getAllCategories,
    getCategoryDetails,
    createCategory,
    updateCategory
} from '../models/categories.js';

import {
    getProjectsByCategoryId
} from '../models/projects.js';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({
            min: 3,
            max: 100
        })
        .withMessage(
            'Category name must be between 3 and 100 characters'
        )
];

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();

    const title = 'Service Categories';

    res.render('categories', {
        title,
        categories
    });
};

const showCategoryDetailsPage = async (req, res) => {
    console.log('CATEGORY DETAILS PAGE RUNNING');

    const categoryId = req.params.id;

    const categoryDetails =
        await getCategoryDetails(categoryId);

    const projects =
        await getProjectsByCategoryId(categoryId);

    const title = 'Category Details';

    res.render('category', {
        title,
        categoryDetails,
        projects
    });
};

const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', {
        title
    });
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const categoryDetails =
        await getCategoryDetails(categoryId);

    const title = 'Edit Category';

    res.render('edit-category', {
        title,
        categoryDetails
    });
};


const processNewCategoryForm = async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        req.flash(
            'error',
            results.array()[0].msg
        );

        return res.redirect(
            '/new-category'
        );
    }

    const { name } = req.body;

    const categoryId =
        await createCategory(name);

    req.flash(
        'success',
        'Category created successfully.'
    );

    res.redirect(
        `/category/${categoryId}`
    );
};

const processEditCategoryForm = async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        req.flash(
            'error',
            results.array()[0].msg
        );

        return res.redirect(
            `/edit-category/${req.params.id}`
        );
    }

    const categoryId = req.params.id;

    const { name } = req.body;

    await updateCategory(
        categoryId,
        name
    );

    req.flash(
        'success',
        'Category updated successfully.'
    );

    res.redirect(
        `/category/${categoryId}`
    );
};


export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};