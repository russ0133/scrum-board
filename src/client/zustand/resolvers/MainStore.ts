import create from 'zustand';

import { MainModel, Task } from '../models/MainModel';
import { removeTask, updateTask } from '../../../server/resolvers/TaskResolver';

interface MainInterface {
  userData: MainModel;
  login: (uid: string) => void;
  logout: () => void;
  setTasks: (tasks: Task[]) => void;
  removeTask: (id: string) => void;
  updateTaskName: (id: string, name: string) => void;
  updateTaskColumn: (id: string, name: string) => void;
  reorderTask: (id: string, sourceIndex: number, destinationIndex: number) => void;
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

  reorderTask: async (id: string, sourceIndex: number, destinationIndex: number) => {
    //  FIXME: Update firebase with new reordered tasks
    const { tasks } = get().userData;
    if (!tasks) return console.error('No task found with this ID.');

    const reorderedTask = tasks.find((store) => store.taskId === id);
    const reorderedTasks = tasks;
    if (reorderedTask) {
      reorderedTask.index = destinationIndex;

      reorderedTasks.splice(sourceIndex, 1);
      reorderedTasks.splice(destinationIndex, 0, reorderedTask);
      reorderedTasks.forEach((task, index) => {
        task.index = index;
      });

      set((state) => ({
        userData: { ...state.userData, tasks: reorderedTasks } as MainModel,
      }));
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
