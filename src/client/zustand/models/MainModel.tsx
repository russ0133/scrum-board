export interface MainModel {
  loggedIn: boolean;
  uid: string | null;
  columns: ColumnObject;
  count: number;
}

export interface ColumnObject {
  [index: string]: ColumnInterface;
}
export interface ColumnInterface {
  order: number;
  title: string;
  items: Task[];
}
export interface Task {
  id: string;
  content: string;
}
