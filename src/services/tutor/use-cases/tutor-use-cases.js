import tutorRepository from "../data-access/tutor-data-access"

const createTutor = async (userId) => {
    try {
        return tutorRepository.createTutor(userId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const getTutor = async (tutorId) => {
    try {
        return tutorRepository.getTutor(tutorId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const getTutors = async () => {
    try {
        return tutorRepository.getTutors();
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateTutor = async ({tutorId}) => {
    try {
        return tutorRepository.updateTutor({tutorId})
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteTutor = async (tutorId) => {
    try {
        await tutorRepository.deleteTutor(tutorId)
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
}