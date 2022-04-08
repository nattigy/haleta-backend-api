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

const updateProgressInfo = async (progressId, jobId, status) => {
  try {
    let progress = getProgress(progressId);
    const newJobId = jobId || progress.jobId;
    const newStatus = status || progress.status;

    return progressRepository.updateProgressInfo({
      progressId: progressId,
      jobId: newJobId,
      status: newStatus,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateStartDate = async (progressId, startDate) => {
  try {
    return progressRepository.updateStartDate(progressId, startDate);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateEndDate = async (progressId, endDate) => {
  try {
    return progressRepository.updateEndDate(progressId, endDate);
  } catch (error) {
    return Promise.reject(error);
  }
};

const increaseTotalHours = async ({ progressId, hours }) => {
  try {
    let progress = await getProgress(progressId);
    let totalHours = progress.totalHours + hours;

    return progressRepository.updateTotalHours({ progressId, totalHours });
  } catch (error) {
    return Promise.reject(error);
  }
};

const decreaseTotalHours = async ({ progressId, hours }) => {
  try {
    let progress = await getProgress(progressId);
    let totalHours = progress.totalHours - hours;

    return progressRepository.updateTotalHours({ progressId, totalHours });
  } catch (error) {
    return Promise.reject(error);
  }
};

const resetTotalHours = async ({ progressId }) => {
  try {
    let totalHours = 0;

    return progressRepository.updateTotalHours({ progressId, totalHours });
  } catch (error) {
    return Promise.reject(error);
  }
};

const addToProgressList = async ({ progressId, progress }) => {
  try {
    let progress = await getProgress(progressId);
    let progressList = progress.progressList;
    progressList.push(progress);

    return progressRepository.updateProgressList({ progressId, progressList });
  } catch (error) {
    return Promise.reject(error);
  }
};

const removeFromProgressList = async ({ progressId, singleProgressId }) => {
  try {
    let progress = await getProgress(progressId);
    let progressList = progress.progressList;
    progressList.remove({ _id: singleProgressId });

    return progressRepository.updateProgressList({ progressId, progressList });
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateFromProgressList = async ({
  progressId,
  singleProgressId,
  startTime,
  endTime,
  duration,
  description,
}) => {
  try {
    let progress = await getProgress(progressId);
    let progressList = progress.progressList;
    const newStartTime = startTime || progressList.startTime;
    const newEndTime = endTime || progressList.endTime;
    const newDuration = duration || progressList.duration;
    const newDescription = description || progressList.description;

    return progressRepository.updateProgressListInfo({
      progressId,
      singleProgressId,
      startTime: newStartTime,
      endTime: newEndTime,
      duration: newDuration,
      description: newDescription,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateRemark = async ({ progressId, singleProgressId, remark }) => {
  try {
    let progress = await getProgress(progressId);
    let progressList = progress.progressList;
    const newRemark = remark || progressList.remark;

    return progressRepository.updateProgressListInfo({
      progressId,
      singleProgressId,
      remark: newRemark,
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
  updateStartDate,
  updateEndDate,
  increaseTotalHours,
  decreaseTotalHours,
  resetTotalHours,
  addToProgressList,
  removeFromProgressList,
  updateFromProgressList,
  updateRemark,
  deleteProgress,
};
