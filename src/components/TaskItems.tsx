import React from "react";
import { useGetAllTasks } from "src/api/tasksAPI";
import {
  filterTasksByDueDate,
  filterTasksByIsCompleted,
  filterTasksByOverDue,
  filterTasksByUnderstandingRate,
  filterTasksByWord,
} from "src/utils/functions/filterTasks";

import useSWR from "swr";
import CompletedTaskItem from "./CompletedTaskItem";
import TaskItem from "./TaskItemBase";

const TaskItems = ({ commonPageProps, specificPageProps }) => {
  const { tasks, error, mutate, isLoading } = useGetAllTasks();
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  if (!tasks) return <div>no tasks</div>;
  let filteredTasks = filterTasksByIsCompleted(
    tasks,
    commonPageProps.isCompletePage
  );

  filteredTasks = filterTasksByWord(filteredTasks, commonPageProps.searchWord);
  console.log({ filteredTasks });
  //fix:ネスト解除したい
  if (!commonPageProps.isCompletePage) {
    if (specificPageProps.filterDueDays?.isFilter) {
      filteredTasks = filterTasksByDueDate(
        filteredTasks,
        specificPageProps.filterDueDays.days
      );
    }
    if (specificPageProps.isFilterByOverdue) {
      filteredTasks = filterTasksByOverDue(filteredTasks);
    }
  } else {
    if (specificPageProps.filterUnderstandingRate?.isFilter) {
      filteredTasks = filterTasksByUnderstandingRate(
        filteredTasks,
        specificPageProps.filterUnderstandingRate.rate
      );
    }
  }

  return (
    <div>
      {filteredTasks?.map((task) => (
        <div key={task.id}>
          {commonPageProps.isCompletePage ? (
            <CompletedTaskItem {...task} />
          ) : (
            <TaskItem {...task} />
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskItems;
