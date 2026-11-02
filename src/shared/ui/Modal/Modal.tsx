import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import s from './Modal.module.css'
import { Button } from '../Button'
import { ModalBase } from '../ModalBase'
import { Close } from '@shared/ui/icons'

type ModalProps = {
  // Для программного управления
  open?: boolean
  onOpenChange?: (open: boolean) => void

  // Контент
  title: string
  children: ReactNode

  // Для случаев с кнопкой-триггером
  trigger?: ReactNode

  // Ширину и прочую геометрию задаёт тот, кто открывает модалку
  className?: string
}

// Модалка с шапкой (заголовок + крестик). Окно, оверлей и анимации — в ModalBase
export function Modal({ open, onOpenChange, title, children, trigger, className }: ModalProps) {
  return (
    <ModalBase open={open} onOpenChange={onOpenChange} trigger={trigger} className={className}>
      <div className={s.modalHeader}>
        <Dialog.Title className="text-h1">{title}</Dialog.Title>
        <Dialog.Close asChild>
          <Button variant="textButton" className={s.button}>
            <Close width={24} height={24} />
          </Button>
        </Dialog.Close>
      </div>
      <div className={s.body}>{children}</div>
    </ModalBase>
  )
}
