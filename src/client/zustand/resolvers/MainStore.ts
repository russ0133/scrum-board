import create from 'zustand';
import Cookies from 'js-cookie';

import { MainModel } from '../models/MainModel';

interface MainInterface {
  userData: MainModel;
  login: () => void;
  logout: () => void;
  /*   removeTodo: (id: string) => void;
  toggleCompletedState: (id: string) => void; */
}

const useMainStore = create<MainInterface>((set) => ({
  // initial state
  userData: { loggedIn: false },

  // methods for manipulating state
  login: () => {
    set((state) => ({
      userData: { ...state.userData, loggedIn: true } as MainModel,
    }));
    Cookies.set('authStatus', 'true');
  },

  logout: () => {
    set((state) => ({
      userData: { ...state.userData, loggedIn: false } as MainModel,
    }));
    Cookies.set('authStatus', 'false');
  },
}));

export default useMainStore;
