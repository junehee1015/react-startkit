import { create } from 'zustand'

type ModalType = 'alert' | 'confirm'

interface ModalState {
  isOpen: boolean
  type: ModalType
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

interface ModalActions {
  openModal: (payload: Omit<ModalState, 'isOpen'>) => void
  closeModal: () => void
}

export const useModalStore = create<ModalState & ModalActions>((set) => ({
  isOpen: false,
  type: 'alert',
  title: '',
  description: '',
  confirmText: '확인',
  cancelText: '취소',
  openModal: (payload) => set({ isOpen: true, ...payload }),
  closeModal: () => set({ isOpen: false, onConfirm: undefined, onCancel: undefined }),
}))
