import create from 'zustand';

import { MainModel, Task } from '../models/MainModel';
import { removeTask, updateAllTasksIndexes, updateTask } from '../../../server/resolvers/TaskResolver';

interface MainInterface {
  userData: MainModel;
  login: (uid: string) => void;
  logout: () => void;
  setTasks: (tasks: Task[]) => void;
  removeTask: (id: string) => void;
  getTaskQty: (column: string) => number;
  updateTaskName: (id: string, name: string) => void;
  updateTaskColumn: (id: string, name: string) => void;
  reorderTask: (id: string, sourceIndex: number, destinationIndex: number, destinationColumn: string) => void;
  updateTaskByParam: (id: string, param: string, data: any) => void;

  /*   removeTodo: (id: string) => void;
  toggleCompletedState: (id: string) => void; */
}

const useMainStore = create<MainInterface>((set, get) => ({
  // initial state
  userData: { loggedIn: false, uid: null, tasks: null },

  // methods for manipulating state

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

  updateTaskByParam: (id: string, param: string, data: any) => {
    const { tasks } = get().userData;
    if (!tasks) return console.error('No task found with this ID.');

    const newTasks = tasks.map((t) => {
      if (t.taskId === id) {
        const mutatedTask = t;
        // @ts-ignore
        mutatedTask[param] = data;
        return mutatedTask;
      }
      return t;
    });

    set((state) => ({
      userData: { ...state.userData, newTasks } as MainModel,
    }));

    console.log(tasks);
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

  updateTaskName: (id: string, newName: string) => {
    const { tasks } = get().userData;
    if (!tasks) return console.error('No task found with this ID.');

    const newTasks = tasks.map((t) => {
      if (t.taskId === id) {
        const mutatedTask = t;
        mutatedTask.name = newName;
        return mutatedTask;
      }
      return t;
    });

    set((state) => ({
      userData: { ...state.userData, newTasks } as MainModel,
    }));

    updateTask(id, 'name', newName);
    console.log(tasks);
  },

  updateTaskColumn: (id: string, newColumn: string) => {
    const { tasks } = get().userData;
    if (!tasks) return console.error('No task found with this ID.');

    const newTasks = tasks.map((t) => {
      if (t.taskId === id) {
        const mutatedTask = t;
        mutatedTask.column = newColumn;
        return mutatedTask;
      }
      return t;
    });

    set((state) => ({
      userData: { ...state.userData, newTasks } as MainModel,
    }));

    updateTask(id, 'column', newColumn);
    console.log(tasks);
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
