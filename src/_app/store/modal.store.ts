// store/modalStore.ts
import { create } from 'zustand'

type ModalState = {
  modals: {
    [key: string]: {
      isOpen: boolean
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?: any
      //data типизируем в момент передачи поэтому тут допустимо any
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModal: (id: string, data?: any) => void
  closeModal: (id: string) => void
}

export const useModalStore = create<ModalState>((set) => ({
  modals: {},
  openModal: (id, data) =>
    set((state) => ({
      modals: { ...state.modals, [id]: { isOpen: true, data } },
    })),
  closeModal: (id) =>
    set((state) => ({
      modals: { ...state.modals, [id]: { isOpen: false } },
    })),
}))
