'use client'
import { useModalStore } from '@app/store'
import { Modal } from '@shared/ui/Modal'
import { ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModalsRootProps<T = any> = {
  id: string
  title: string
  children: ReactNode | ((data: T) => ReactNode)
  trigger?: ReactNode
}

export const ModalsRoot = <T,>({ id, title, children, trigger }: ModalsRootProps<T>) => {
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
