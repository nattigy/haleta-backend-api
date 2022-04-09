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

const updateProgressInfo = async (progressId, jobId) => {
    try {
        return ProgressModel.findByIdAndUpdate(progressId, {jobId}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const startProgress = async (progressId, startDate, status) => {
    try {
        return ProgressModel.findByIdAndUpdate(progressId, {startDate, status},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const endProgress = async (progressId, endDate, status) => {
    try {
        return ProgressModel.findByIdAndUpdate(progressId, {endDate, status},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const increaseTotalHours = async ({progressId, hours}) => {
    try {
        return ProgressModel.findByIdAndUpdate(progressId, {$inc: {totalHours: hours}},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const decreaseTotalHours = async ({progressId, hours}) => {
    try {
        return ProgressModel.findByIdAndUpdate(progressId, {$inc: {totalHours: -hours}},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const resetTotalHours = async ({progressId}) => {
    try {
        return ProgressModel.findByIdAndUpdate(progressId, {$set: {totalHours: 0}},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const addNewProgressList = async (progressId, progress) => {
    try {
        return ProgressModel.findByIdAndUpdate(progressId, {$addToSet: {progressList: progress}},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const removeFromProgressList = async (progressId, singleProgressId) => {
    try {
        return ProgressModel.findByIdAndUpdate(progressId, {$pull: {progressList: {_id: singleProgressId}}},{new:true});
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
                                          description
                                      }) => {
    try {
        return ProgressModel.updateOne(
            {_id: progressId, "progressList._id": singleProgressId},
            {
                $set: {
                    "progressList.$.startTime": startTime,
                    "progressList.$.endTime": endTime,
                    "progressList.$.duration": duration,
                    "progressList.$.description": description,
                },
            },
            {new:true}
        );
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
        return ProgressModel.updateOne(
            {_id: progressId, "progressList._id": singleProgressId},
            {
                $set: {
                    "progressList.$.remark": remark,
                },
            },
            {new: true}
        );
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
    startProgress,
    endProgress,
    increaseTotalHours,
    decreaseTotalHours,
    resetTotalHours,
    removeFromProgressList,
    addNewProgressList,
    updateSingleProgress,
    updateRemark,
    deleteProgress,
};
