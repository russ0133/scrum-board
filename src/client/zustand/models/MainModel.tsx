export interface MainModel {
  loggedIn: boolean;
  uid: string | null;
  tasks: Task[] | null;
  newTasks: NewTask[];
  columns: ColumnInterface[];
}

export interface Task {
  name: string;
  order: number;
  column: string;
  status: boolean;
  taskId: string;
}

export interface ColumnInterface {
  id: string;
  title: string;
  taskIds: string[];
}
export interface NewTask {
  id: string;
  content: string;
}

interface Col {
  hey: string;
}

const STRUCTURE = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'hello',
    },
    'task-2': {
      id: 'task-2',
      content: 'hi',
    },
    'task-3': {
      id: 'task-3',
      content: 'bonjour',
    },
  },

  columns: {
    'column-1': {
      id: 'column-1',
      title: 'to do',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
  },
};
