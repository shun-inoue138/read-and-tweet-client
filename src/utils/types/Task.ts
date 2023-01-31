export type Task = {
  url: string;
  _id: string;
  title: string;
  randomNote: string;
  categories: string[];
  postContent: string;
  understandingRate: 1 | 2 | 3 | 4 | 5;
  dueDate: string;
  isCompleted: boolean;
  updatedAt: string;
  createdAt: string;
};
