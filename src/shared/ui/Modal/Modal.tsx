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
  modal?: boolean

  // Контент
  title: string
  children: ReactNode

  // Для случаев с кнопкой-триггером
  trigger?: ReactNode

  // Ширину и прочую геометрию задаёт тот, кто открывает модалку
  className?: string
  // Класс для области под шапкой — например, убрать отступы, если контент до краёв
  bodyClassName?: string
  headerActions?: ReactNode
  showCloseButton?: boolean
}

// Модалка с шапкой (заголовок + крестик). Окно, оверлей и анимации — в ModalBase
export function Modal({
  open,
  onOpenChange,
  title,
  children,
  trigger,
  className,
  bodyClassName,
  modal,
  headerActions,
  showCloseButton = true,
}: ModalProps) {
  return (
    <ModalBase
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      className={className}
      modal={modal}
    >
      <div className={s.modalHeader}>
        <Dialog.Title className="text-h1">{title}</Dialog.Title>
        {headerActions}

        {showCloseButton && (
          <Dialog.Close asChild>
            <Button variant="textButton" className={s.button}>
              <Close width={24} height={24} />
            </Button>
          </Dialog.Close>
        )}
      </div>
      <div className={bodyClassName ? `${s.body} ${bodyClassName}` : s.body}>{children}</div>
    </ModalBase>
  )
}
