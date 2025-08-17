const isTaskCorrected = (task: string): boolean => {
  const trimmedTask = task.trim();

  if (trimmedTask.length >= 2 && trimmedTask.length <= 64) {
    return true;
  } else {
    return false;
  }
};

export default isTaskCorrected;
