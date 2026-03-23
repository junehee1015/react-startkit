import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useModalStore } from '@/stores/useModalStore'

export function GlobalModal() {
  const { isOpen, type, title, description, confirmText, cancelText, onConfirm, onCancel, closeModal } = useModalStore()

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    closeModal()
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    closeModal()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={closeModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className={description ? '' : 'sr-only'}>{description ? '' : '해당 알림은 설명이 존재하지 않습니다.'}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {type === 'confirm' && <AlertDialogCancel onClick={handleCancel}>{cancelText}</AlertDialogCancel>}
          <AlertDialogAction onClick={handleConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
