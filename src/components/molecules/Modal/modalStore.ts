import { default as produce } from 'immer';
import { useEffect } from 'react';
import create, { State, StateCreator } from 'zustand';

// import { useSetQueryParam } from '@/utils/hooks/useQueryParams';

interface ModalOptions {
  isShown?: boolean;
  isClosable?: boolean;
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
};

const immer = <T extends State>(
  config: StateCreator<T, (fn: (state: T) => void) => void>,
): StateCreator<T> => (set, get, api) =>
  config(fn => set(produce(fn) as (state: T) => T), get, api);

const useModalStore = create<ModalStore>(
  immer(set => ({
    modals: {},
    set: set,
  })),
);

export const useModalState = (key: string) => {
  const modals = useModalStore(state => state.modals);

  return modals[key];
};

export const useModal = (key: string, options?: ModalOptions) => {
  const set = useModalStore(state => state.set);

  // const setQueryParam = useSetQueryParam('modal');

  useEffect(() => {
    set(state => {
      const currentModalState = state.modals[key] || {};
      state.modals[key] = { isClosable: true, isShown: false, ...currentModalState, ...options };
    });
  }, [key, options]);

  function show() {
    // setQueryParam(key);
    set(state => {
      state.modals[key].isShown = true;
    });
  }

  function hide() {
    // setQueryParam(undefined);
    set(state => {
      state.modals[key].isShown = false;
    });
  }

  return {
    show,
    hide,
  };
};
