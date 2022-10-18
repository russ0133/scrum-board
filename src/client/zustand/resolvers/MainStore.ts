import create from 'zustand';
import Cookies from 'js-cookie';

import { MainModel, Task } from '../models/MainModel';
import { removeTask } from '../../../server/resolvers/TaskResolver';

interface MainInterface {
  userData: MainModel;
  login: (uid: string) => void;
  logout: () => void;
  setTasks: (tasks: Task[]) => void;
  removeTask: (id: string) => void;
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
