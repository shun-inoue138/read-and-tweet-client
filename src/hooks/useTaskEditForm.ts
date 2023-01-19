import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetTask } from "src/api/tasksAPI";
import { IncompletedTask, Task } from "src/utils/types/Task";

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

  const TaskEditObject = {
    URL: {
      placeholder: "URLを入力してください",
      type: "text",
      registerReturn: register("url", {
        required: "URLは必須です",
      }),
      errors: errors.url?.message,
      defaultValue: task?.url,
    },
    title: {
      placeholder: "タイトルを入力してください",
      type: "text",
      registerReturn: register("title", {
        required: "タイトルは必須です",
      }),
      errors: errors.title?.message,
      defaultValue: task?.title,
    },
    randomNote: {
      placeholder: "ご自由にメモをどうぞ",
      registerReturn: register("randomNote"),
      errors: errors.randomNote?.message,
      defaultValue: task?.randomNote,
    },
    dueDate: {
      type: "date",
      registerReturn: register("dueDate"),
      errors: errors.dueDate?.message,
      defaultValue: task?.dueDate,
    },
    postContent: {
      placeholder: "投稿内容",
      type: "text",
      registerReturn: register("postContent"),
      errors: errors.postContent?.message,
      defaultValue: task?.postContent,
    },
  };

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
