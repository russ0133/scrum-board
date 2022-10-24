import { v4 as uuidv4 } from 'uuid';
import produce from 'immer';
import create from 'zustand';

import { ColumnObject, MainModel } from '../models/MainModel';
import { logout } from '../../../server/resolvers/AuthResolver';

interface MainInterface {
  userData: any;

  login: (uid: string) => void;
  logout: () => void;

  setColumn: (column: ColumnObject) => void;

  deleteTask: (columnId: string, cardIndex: number) => void;
  addTask: (columnId: string, content: string) => void;

  immerInc: (index: number, property: string, value: any) => void;
}

const useMainStore = create<MainInterface>((set, get) => ({
  // initial state
  userData: {
    loggedIn: false,
    uid: null,
    columns: {},
    count: 0,
    a: [{ b: 3 }, { b: 4 }],
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

  immerInc: (index, property, value) => {
    set(
      produce((state: MainInterface) => {
        state.userData.a[index][property] += value;
        console.log(state.userData.count);
      })
    );
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
    const b = logout();
    window.alert(b);
    set((state) => ({
      userData: { ...state.userData, loggedIn: false, uid: null } as MainModel,
    }));
  },
}));

export default useMainStore;
