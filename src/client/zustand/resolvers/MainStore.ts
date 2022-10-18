import create from 'zustand';
import Cookies from 'js-cookie';

import { MainModel, Task } from '../models/MainModel';

interface MainInterface {
  userData: MainModel;
  login: (uid: string) => void;
  logout: () => void;
  setTasks: (tasks: Task[]) => void;
  /*   removeTodo: (id: string) => void;
  toggleCompletedState: (id: string) => void; */
}

const useMainStore = create<MainInterface>((set) => ({
  // initial state
  userData: { loggedIn: false, uid: null, tasks: null },

  // methods for manipulating state

  setTasks: (tasks: Task[]) => {
    set((state) => ({
      userData: { ...state.userData, tasks } as MainModel,
    }));
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
