export interface MainModel {
  loggedIn: boolean;
  uid: string | null;
  tasks: Task[] | null;
}

export interface Task {
  name: string;
  order: number;
  column: string;
  status: boolean;
  taskId: string;
}
