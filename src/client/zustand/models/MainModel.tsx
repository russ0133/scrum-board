export interface MainModel {
  loggedIn: boolean;
  uid: string | null;
  tasks: Task[] | null;
}

export interface Task {
  name: string;
  column: string;
  status: boolean;
}
