import {ProgressModel} from "../../../models/progress";

const createProgress = async (jobId) => {
    try {
        return ProgressModel.create({jobId: jobId});
    } catch (error) {
        return Promise.reject(error);
    }
};

const getProgress = async (progressId) => {
    try {
        return ProgressModel.findById(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getProgresses = async () => {
    try {
        return ProgressModel.find();
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateProgressInfo = async (progressId, jobId, status) => {
    try {
        return ProgressModel.findByIdAndUpdate(progressId, {jobId, status}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateStartDate = async (progressId, startDate) => {
    try {
        await ProgressModel.findByIdAndUpdate(progressId, {startDate});
        return getProgress(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateEndDate = async (progressId, endDate) => {
    try {
        await ProgressModel.findByIdAndUpdate(progressId, {endDate});
        return getProgress(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const increaseTotalHours = async ({progressId, totalHours}) => {
    try {
        await ProgressModel.findByIdAndUpdate(progressId, {$inc: {totalHours: totalHours}});
        return getProgress(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const decreaseTotalHours = async ({progressId, totalHours}) => {
    try {
        await ProgressModel.findByIdAndUpdate(progressId, {$inc: {totalHours: -totalHours}});
        return getProgress(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const resetTotalHours = async ({progressId}) => {
    try {
        await ProgressModel.findByIdAndUpdate(progressId, {$set: {totalHours: 0}});
        return getProgress(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const addNewProgressList = async (progressId, progress) => {
    try {
        await ProgressModel.findByIdAndUpdate(progressId, {$addToSet: {progressList: progress}});
        return getProgress(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const removeFromProgressList = async (progressId, singleProgressId) => {
    try {
        await ProgressModel.findByIdAndUpdate(progressId, {$pull: {progressList: {_id: singleProgressId}}});
        return getProgress(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateProgressListInfo = async ({
                                          progressId,
                                          singleProgressId,
                                          startTime,
                                          endTime,
                                          duration,
                                          description
                                      }) => {
    try {
        await ProgressModel.updateOne(
            {_id: progressId, "progressList._id": singleProgressId},
            {
                $set: {
                    "progressList.$.startTime": startTime,
                    "progressList.$.endTime": endTime,
                    "progressList.$.duration": duration,
                    "progressList.$.description": description,
                },
            }
        );
        return getProgress(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateRemark = async ({
                                progressId,
                                singleProgressId,
                                remark
                            }) => {
    try {
        await ProgressModel.updateOne(
            {_id: progressId, "progressList._id": singleProgressId},
            {
                $set: {
                    "progressList.$.remark": remark,
                },
            },
            {new: true}
        );
        return getProgress(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteProgress = async (progressId) => {
    try {
        await ProgressModel.findByIdAndDelete(progressId);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    createProgress,
    getProgress,
    getProgresses,
    updateProgressInfo,
    updateStartDate,
    updateEndDate,
    updateTotalHours,
    updateProgressList,
    addNewProgressList,
    updateProgressListInfo,
    updateRemark,
    deleteProgress,
};
