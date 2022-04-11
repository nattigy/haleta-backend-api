import progressRepository from "../data-access/progress-data-access";

const createProgress = async (jobId) => {
    try {
        return progressRepository.createProgress(jobId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getProgress = async (progressId) => {
    try {
        return progressRepository.getProgress(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getProgresses = async () => {
    try {
        return progressRepository.getProgresses();
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateProgressInfo = async (progressId, jobId) => {
    try {
        let progress = getProgress(progressId);
        const newJobId = jobId || progress.jobId;

        return progressRepository.updateProgressInfo({
            progressId: progressId,
            jobId: newJobId,
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

const startProgress = async ({progressId, startDate, status}) => {
    try {
        return progressRepository.startProgress({progressId, startDate, status});
    } catch (error) {
        return Promise.reject(error);
    }
};

const endProgress = async ({progressId, endDate, status}) => {
    try {
        return progressRepository.endProgress({progressId, endDate, status});
    } catch (error) {
        return Promise.reject(error);
    }
};

const extendEndDateProgress = async ({progressId, endDate}) => {
    try {
        return progressRepository.endProgress({progressId, endDate});
    } catch (error) {
        return Promise.reject(error);
    }
};

const increaseTotalHours = async ({progressId, hours}) => {
    try {
        return progressRepository.increaseTotalHours({progressId, hours});
    } catch (error) {
        return Promise.reject(error);
    }
};

const decreaseTotalHours = async ({progressId, hours}) => {
    try {
        return progressRepository.decreaseTotalHours({progressId, hours});
    } catch (error) {
        return Promise.reject(error);
    }
};

const addToProgressList = async ({progressId, progress}) => {
    try {
        return progressRepository.addNewProgressList({progressId, progress});
    } catch (error) {
        return Promise.reject(error);
    }
};

const removeFromProgressList = async ({progressId, singleProgressId}) => {
    try {
        return progressRepository.removeFromProgressList({progressId, singleProgressId});
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateSingleProgress = async ({
                                          progressId,
                                          singleProgressId,
                                          startTime,
                                          endTime,
                                          duration,
                                          description,
                                      }) => {
    try {
        return progressRepository.updateSingleProgress({
            progressId,
            singleProgressId,
            startTime,
            endTime,
            duration,
            description,
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateRemark = async ({progressId, singleProgressId, remark}) => {
    try {
        return progressRepository.updateRemark({
            progressId,
            singleProgressId,
            remark,
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteProgress = async (progressId) => {
    try {
        await progressRepository.deleteProgress(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    createProgress,
    getProgress,
    getProgresses,
    updateProgressInfo,
    startProgress,
    endProgress,
    increaseTotalHours,
    decreaseTotalHours,
    extendEndDateProgress,
    addToProgressList,
    removeFromProgressList,
    updateSingleProgress,
    updateRemark,
    deleteProgress,
};
