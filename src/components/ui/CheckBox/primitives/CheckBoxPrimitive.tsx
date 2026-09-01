'use client'

import { ComponentRef, forwardRef, ReactNode } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import s from './CheckBoxPrimitive.module.css'

type RootProps = {
  onValueChange: (checked: boolean) => void
  className?: string
  children?: ReactNode
} & Omit<Checkbox.CheckboxProps, 'onCheckedChange' | 'className'>

export const CheckboxRoot = forwardRef<ComponentRef<typeof Checkbox.Root>, RootProps>(
  ({ onValueChange, className, children, ...props }, ref) => {
    return (
      <Checkbox.Root
        ref={ref}
        {...props}
        className={`${s.checkboxRoot} ${className ?? ''}`}
        onCheckedChange={(value) => onValueChange(value === true)}
      >
        {children}
      </Checkbox.Root>
    )
  }
)
CheckboxRoot.displayName = 'CheckboxRoot'

type IndicatorProps = {
  className?: string
  children?: ReactNode
} & Omit<Checkbox.CheckboxIndicatorProps, 'className'>

export const CheckboxIndicator = forwardRef<ComponentRef<typeof Checkbox.Indicator>, IndicatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Checkbox.Indicator
        ref={ref}
        {...props}
        className={`${s.indicator} ${className ?? ''}`}
      >
        {children}
      </Checkbox.Indicator>
    )
  }
)
CheckboxIndicator.displayName = 'CheckboxIndicator'
