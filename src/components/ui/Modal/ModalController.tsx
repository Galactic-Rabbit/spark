// components/Modal/ModalController.tsx
import { useModalStore } from '@/stores'
import { Modal } from './Modal'
import { ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModalControllerProps<T = any> = {
  id: string
  title: string
  children: ReactNode | ((data: T) => ReactNode)
  trigger?: ReactNode
}

export const ModalController = <T,>({ id, title, children, trigger }: ModalControllerProps<T>) => {
  const { modals, closeModal } = useModalStore()
  const modal = modals[id] || { isOpen: false, data: null as T }

  return (
    <Modal
      title={title}
      open={modal.isOpen}
      onOpenChange={(open) => !open && closeModal(id)}
      trigger={trigger}
    >
      {typeof children === 'function' ? children(modal.data as T) : children}
    </Modal>
  )
}
