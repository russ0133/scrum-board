import create from 'zustand';

import { ColumnInterface, MainModel, Task } from '../models/MainModel';
import { removeTask, updateAllTasksIndexes, updateTask } from '../../../server/resolvers/TaskResolver';

interface MainInterface {
  userData: MainModel;
  login: (uid: string) => void;
  logout: () => void;
  setTasks: (tasks: Task[]) => void;
  setColumn: (droppableId: string, draggableId: string, sourceIndex: number, destinationIndex: number) => void;
  removeTask: (id: string) => void;
  getTaskQty: (column: string) => number;
  reorderTask: (id: string, sourceIndex: number, destinationIndex: number, destinationColumn: string) => void;

  /*   removeTodo: (id: string) => void;
  toggleCompletedState: (id: string) => void; */
}

const useMainStore = create<MainInterface>((set, get) => ({
  // initial state
  userData: {
    loggedIn: false,
    uid: null,
    tasks: null,
    newTasks: [
      { id: 'task-1', content: 'wash dishes' },
      { id: 'task-2', content: 'do-something' },
      { id: 'task-3', content: 'do-something-else' },
    ],
    columns: [
      {
        id: 'column-1',
        title: 'to-do',
        taskIds: ['task-1', 'task-2', 'task-3'],
      },
      {
        id: 'column-2',
        title: 'to-do',
        taskIds: [],
      },
    ],
  },

  // methods for manipulating state
  setColumn: (droppableId: string, draggableId: string, sourceIndex: number, destinationIndex: number) => {
    /*     const { tasks } = get().userData;
    if (!tasks) return console.error('No task found with this ID.');

    const reorderedTask = tasks.find((store) => store.taskId === id);
    const reorderedTasks = tasks;
    if (reorderedTask) {
      reorderedTask.order = destinationIndex;
      reorderedTask.column = destinationColumn;

      reorderedTasks.splice(sourceIndex, 1);
      reorderedTasks.splice(destinationIndex, 0, reorderedTask);
      reorderedTasks.forEach((task, index) => {
        task.order = index;
      });

      set((state) => ({
        userData: { ...state.userData, tasks: reorderedTasks } as MainModel,
      }));

      setTimeout(() => {
        updateAllTasksIndexes(reorderedTasks);
        console.log('Updated store.');
      }, 1000);
    } */
    const { columns } = get().userData;
    if (!columns) return console.error('a');
    const reorderedColumn = tasks.
  },

  ///

  setTasks: (tasks: Task[]) => {
    set((state) => ({
      userData: { ...state.userData, tasks } as MainModel,
    }));
  },

  getTaskQty: (column: string) => {
    const { tasks } = get().userData;
    if (tasks) {
      const a = tasks.filter((task) => task.column === column).length;
      if (a > 0) return a;
      return 0;
    }
    return 0;
  },

  reorderTask: (id: string, sourceIndex: number, destinationIndex: number, destinationColumn: string) => {
    const { tasks } = get().userData;
    if (!tasks) return console.error('No task found with this ID.');

    const reorderedTask = tasks.find((store) => store.taskId === id);
    const reorderedTasks = tasks;
    if (reorderedTask) {
      reorderedTask.order = destinationIndex;
      reorderedTask.column = destinationColumn;

      reorderedTasks.splice(sourceIndex, 1);
      reorderedTasks.splice(destinationIndex, 0, reorderedTask);
      reorderedTasks.forEach((task, index) => {
        task.order = index;
      });

      set((state) => ({
        userData: { ...state.userData, tasks: reorderedTasks } as MainModel,
      }));

      setTimeout(() => {
        updateAllTasksIndexes(reorderedTasks);
        console.log('Updated store.');
      }, 1000);
    }
  },

  removeTask: (id: string) => {
    const { tasks } = get().userData;
    if (!tasks) return console.error('No task found with this ID.');

    const newTasks = tasks.filter((t) => t.taskId !== id);
    set((state) => ({
      userData: { ...state.userData, tasks: newTasks } as MainModel,
    }));

    removeTask(id);
  },

  login: (uid: string) => {
    set((state) => ({
      userData: { ...state.userData, loggedIn: true, uid } as MainModel,
    }));
  },

  logout: () => {
    set((state) => ({
      userData: { ...state.userData, loggedIn: false, uid: null } as MainModel,
    }));
  },
}));

export default useMainStore;
