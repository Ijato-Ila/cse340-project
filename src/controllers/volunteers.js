import {
    addVolunteer,
    removeVolunteer
} from '../models/volunteers.js';


const processVolunteerSignup = async (
    req,
    res
) => {
    const userId =
        req.session.user.user_id;

    const projectId =
        req.params.projectId;

    try {
        await addVolunteer(
            userId,
            projectId
        );

        req.flash(
            'success',
            'You have signed up to volunteer.'
        );
    }
    catch (error) {
        console.error(error);

        req.flash(
            'error',
            'Unable to volunteer for project.'
        );
    }

    res.redirect(
        `/project/${projectId}`
    );
};


const processVolunteerRemoval = async (
    req,
    res
) => {
    const userId =
        req.session.user.user_id;

    const projectId =
        req.params.projectId;

    try {
        await removeVolunteer(
            userId,
            projectId
        );

        req.flash(
            'success',
            'You are no longer volunteering for this project.'
        );
    }
    catch (error) {
        console.error(error);

        req.flash(
            'error',
            'Unable to remove volunteer signup.'
        );
    }

    res.redirect(
        `/project/${projectId}`
    );
};


export {
    processVolunteerSignup,
    processVolunteerRemoval
};
