import create from 'zustand';

import { ColumnObject, MainModel } from '../models/MainModel';

interface MainInterface {
  userData: MainModel;
  login: (uid: string) => void;
  logout: () => void;
  setColumn: (column: ColumnObject) => void;

  /*   removeTodo: (id: string) => void;
  toggleCompletedState: (id: string) => void; */
}

const useMainStore = create<MainInterface>((set) => ({
  // initial state
  userData: {
    loggedIn: false,
    uid: null,
    columns: {},
  },

  // methods for manipulating state
  setColumn: (column: ColumnObject) => {
    set((state) => ({
      userData: { ...state.userData, columns: column } as MainModel,
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
