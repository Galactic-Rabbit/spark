import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import s from './Modal.module.css'
import { Button } from '../Button'
import { CloseIcon } from '@/components/icons/CloseIcon/CloseIcon'

type ModalProps = {
  // Для программного управления
  open?: boolean
  onOpenChange?: (open: boolean) => void

  // Контент
  title: string
  children: ReactNode

  // Для случаев с кнопкой-триггером
  trigger?: ReactNode
}

export function Modal({ open, onOpenChange, title, children, trigger }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {/* Триггер - только если передан */}
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <div className={s.modalHeader}>
            <Dialog.Title className="text-h1">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="textButton" className={s.button}>
                <CloseIcon />
              </Button>
            </Dialog.Close>
          </div>
          <div className={s.body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
