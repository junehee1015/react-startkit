import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useModalStore } from '@/stores/modalStore'

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
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {type === 'confirm' && <AlertDialogCancel onClick={handleCancel}>{cancelText}</AlertDialogCancel>}
          <AlertDialogAction onClick={handleConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
