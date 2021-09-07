import { default as produce } from 'immer';
import { useCallback, useEffect, useMemo } from 'react';
import create, { GetState, State, StateCreator } from 'zustand';

interface ModalOptions {
  isShown?: boolean;
  isClosable?: boolean;
  closeButton?: boolean;
  closeOthers?: boolean;
  title?: any;
  content?: any;
  callback?: () => void;
  callbackLabel?: string;
}

interface Modals {
  [key: string]: ModalOptions;
}

type ModalStore = {
  modals: Modals;
  set: (fn: (state: ModalStore) => void) => void;
  get: GetState<ModalStore>;
};

const immer =
  <T extends State>(config: StateCreator<T, (fn: (state: T) => void) => void>): StateCreator<T> =>
  (set, get, api) =>
    config(fn => set(produce(fn) as (state: T) => T), get, api);

const useModalStore = create<ModalStore>(
  immer((set, get) => ({
    modals: {},
    set: set,
    get: get,
  })),
);

export const useModalState = (key: string) => {
  const modals = useModalStore(state => state.modals);

  return modals[key];
};

const defaultModalState = {
  isClosable: true,
  closeButton: true,
  isShown: false,
  closeOthers: true,
};

export const useModal = (key: string, options?: ModalOptions) => {
  const { set } = useModalStore.getState();

  useEffect(() => {
    set(state => {
      const currentModalState = state.modals[key] || {};
      state.modals[key] = {
        ...defaultModalState,
        ...currentModalState,
        ...options,
      };
    });
  }, [key, options, set]);

  const closeAll = useCallback(() => {
    set(state => {
      Object.keys(state.modals).forEach(item => {
        state.modals[item].isShown = false;
      });
    });
  }, [set]);

  const show = useCallback(
    (options?: ModalOptions) => {
      set(state => {
        if (state.modals[key].closeOthers) {
          Object.keys(state.modals).forEach(item => {
            state.modals[item].isShown = false;
          });
        }

        state.modals[key] = {
          ...state.modals[key],
          ...options,
          isShown: true,
        };
      });
    },
    [set, key],
  );

  const hide = useCallback(() => {
    set(state => {
      if (state.modals[key]) state.modals[key].isShown = false;
    });
  }, [set, key]);

  return useMemo(() => {
    return {
      show,
      hide,
      closeAll,
    };
  }, [show, hide, closeAll]);
};
