import create from 'zustand';
import Cookies from 'js-cookie';

import { MainModel } from '../models/MainModel';

interface MainInterface {
  userData: MainModel;
  login: (uid: string) => void;
  logout: () => void;
  /*   removeTodo: (id: string) => void;
  toggleCompletedState: (id: string) => void; */
}

const useMainStore = create<MainInterface>((set) => ({
  // initial state
  userData: { loggedIn: false, uid: null },

  // methods for manipulating state
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
