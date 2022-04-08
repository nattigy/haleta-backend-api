import { ProgressModel } from "../../../models/progress";

const createProgress = async (jobId) => {
  try {
    return ProgressModel.create({ jobId: jobId });
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
    await ProgressModel.findByIdAndUpdate(progressId, { jobId, status });
    return getProgress(progressId);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateStartDate = async (progressId, startDate) => {
  try {
    await ProgressModel.findByIdAndUpdate(progressId, { startDate });
    return getProgress(progressId);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateEndDate = async (progressId, endDate) => {
  try {
    await ProgressModel.findByIdAndUpdate(progressId, { endDate });
    return getProgress(progressId);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateTotalHours = async ({ progressId, totalHours }) => {
  try {
    await ProgressModel.findByIdAndUpdate(progressId, { totalHours });
    return getProgress(progressId);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateProgressList = async (progressId, progressList) => {
  try {
    await ProgressModel.findByIdAndUpdate(progressId, { progressList });
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
      { _id: progressId, "progressList._id": singleProgressId },
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
        { _id: progressId, "progressList._id": singleProgressId },
        {
          $set: {
            "progressList.$.remark": remark,
          },
        }
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
  updateProgressListInfo,
  updateRemark,
  deleteProgress,
};
