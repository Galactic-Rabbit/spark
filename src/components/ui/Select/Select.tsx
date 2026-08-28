'use client'

import SelectDropdownIcon from '@/components/icons/SelectDropdownIcon/SelectDropdownIcon'
import { Select } from 'radix-ui'
import s from './Select.module.css'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  options: SelectOption[]
  label?: string
  className?: string //добавил
}

const SelectBox = ({
  value,
  onValueChange,
  disabled,
  placeholder,
  options,
  label,
  className,
}: SelectProps) => {
  return (
    <div className={`${s.wrapper} ${className || ''}`}>
      {label && <span className={`${s.label} text-regular-sm`}>{label}</span>}
      <Select.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <Select.Trigger className={`${s.trigger} text-regular ${className || ''}`}>
          <Select.Value placeholder={placeholder} />

          <Select.Icon className={s.icon}>
            <SelectDropdownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className={s.content}
            position="popper"
            side="bottom"
            align="start"
            sideOffset={0}
          >
            <Select.Viewport className={s.viewport}>
              {options.map((option) => (
                <Select.Item className={s.item} key={option.value} value={option.value}>
                  <Select.ItemText>
                    <span className={s.itemText}>{option.label}</span>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

export default SelectBox
