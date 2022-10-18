export interface MainModel {
  loggedIn: boolean;
  uid: string | null;
  tasks: Task[] | null;
}

export interface Task {
  name: string;
  index: number;
  column: string;
  status: boolean;
  taskId: string;
}
