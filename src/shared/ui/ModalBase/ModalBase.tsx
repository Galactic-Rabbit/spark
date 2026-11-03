import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from 'radix-ui'
import { ReactNode } from 'react'
import { Close } from '@shared/ui/icons'
import s from './ModalBase.module.css'

type ModalBaseProps = {
  // Для программного управления
  open?: boolean
  onOpenChange?: (open: boolean) => void

  children: ReactNode

  // Для случаев с кнопкой-триггером
  trigger?: ReactNode

  // Заголовок для скринридеров, на экране не виден. Нужен модалкам без шапки,
  // например модалке поста. Если шапка с видимым <Dialog.Title> есть (как в Modal), не передаём
  srTitle?: string

  // Крестик снаружи окна, в правом верхнем углу. В DOM он всё равно внутри
  // Dialog.Content, иначе Radix не пустит к нему фокус с клавиатуры
  withOutsideClose?: boolean

  // Ширину и прочую геометрию задаёт тот, кто открывает модалку
  className?: string
}

export function ModalBase({
  open,
  onOpenChange,
  children,
  trigger,
  srTitle,
  withOutsideClose = false,
  className,
}: ModalBaseProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={`${s.content} ${className || ''}`.trim()}>
          {srTitle && (
            <VisuallyHidden.Root asChild>
              <Dialog.Title>{srTitle}</Dialog.Title>
            </VisuallyHidden.Root>
          )}

          {children}

          {withOutsideClose && (
            <Dialog.Close className={s.outsideClose} aria-label="Close">
              <Close width={24} height={24} />
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
