import {TutorModel} from "../../../models/tutor"

const createTutor = async (userId) => {
    try {
        return TutorModel.create({userId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const getTutor = async (tutorId) => {
    try {
        return TutorModel.findById(tutorId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const getTutors = async () => {
    try {
        return TutorModel.find();
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateTutor = async ({tutorId}) => {
    try {
        // update tutor
        return getTutor(tutorId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteTutor = async (tutorId) => {
    try {
        await TutorModel.findByIdAndDelete(tutorId)
    } catch (error) {
        return Promise.reject(error);
    }
}


export default {
    createTutor,
    getTutor,
    getTutors,
    updateTutor,
    deleteTutor
};