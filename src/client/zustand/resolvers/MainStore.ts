import { v4 as uuidv4 } from 'uuid';
import create from 'zustand';

import { ColumnObject, MainModel } from '../models/MainModel';

interface MainInterface {
  userData: MainModel;
  login: (uid: string) => void;
  logout: () => void;
  setColumn: (column: ColumnObject) => void;
  deleteTask: (columnId: string, cardIndex: number) => void;
  addTask: (columnId: string, content: string) => void;

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
    set((state) => ({
      userData: { ...state.userData, columns: column } as MainModel,
    }));
  },

  addTask: (columnId: string, content: string) => {
    let { columns } = get().userData;
    const column = columns[columnId];

    column.items.push({ id: uuidv4(), content });
    columns = { ...columns, [columnId]: column };

    set((state) => ({
      userData: { ...state.userData, columns } as MainModel,
    }));
  },

  deleteTask: (columnId: string, cardIndex: number) => {
    let { columns } = get().userData;
    const column = columns[columnId];

    column.items.splice(cardIndex, 1);
    columns = { ...columns, [columnId]: column };

    set((state) => ({ userData: { ...state.userData, columns } as MainModel }));
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
