import create from 'zustand';

import { ColumnObject, MainModel } from '../models/MainModel';
import { updateColumns } from '../../../server/resolvers/TaskResolver';

interface MainInterface {
  userData: MainModel;
  login: (uid: string) => void;
  logout: () => void;
  setColumn: (column: ColumnObject) => void;

  /*   removeTodo: (id: string) => void;
  toggleCompletedState: (id: string) => void; */
}

const useMainStore = create<MainInterface>((set, get) => ({
  // initial state
  userData: {
    loggedIn: false,
    uid: null,
    columns: {},
  },

  // methods for manipulating state
  setColumn: (column: ColumnObject) => {
    const { uid, columns } = get().userData;
    set((state) => ({
      userData: { ...state.userData, columns: column } as MainModel,
    }));
    console.log(get().userData);
    if (uid) updateColumns(columns, uid);
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
