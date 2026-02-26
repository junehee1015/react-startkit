import { useModalStore } from '@/stores/modalStore'

interface ConfirmOptions {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export type AlertOptions = Omit<ConfirmOptions, 'cancelText' | 'onCancel'>

export const useConfirm = () => {
  const openModal = useModalStore((state) => state.openModal)

  const openConfirm = (options: ConfirmOptions) => {
    openModal({ type: 'confirm', ...options })
  }

  const openAlert = (options: AlertOptions) => {
    openModal({ type: 'alert', ...options })
  }

  return { openConfirm, openAlert }
}
