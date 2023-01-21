import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetTask } from "src/api/tasksAPI";
import { taskObjectFactory } from "src/utils/functions/taskObjectFactory";
import { Task } from "src/utils/types/Task";

export const useTaskEditForm = (id: number) => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<Task>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { task, isLoading, error } = useGetTask(id, reset);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const TaskEditObject = taskObjectFactory(register, errors, task);

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    fields,
    append,
    remove,
    task,
    error,
    TaskEditObject,
  };
};
